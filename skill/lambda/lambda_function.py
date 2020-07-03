# -*- coding: utf-8 -*-

# This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK for Python.
# Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
# session persistence, api calls, and more.
# This sample is built using the handler classes approach in skill builder.
import logging
import ask_sdk_core.utils as ask_utils
import requests as req

from ask_sdk_core.skill_builder import SkillBuilder
from ask_sdk_core.dispatch_components import AbstractRequestHandler
from ask_sdk_core.dispatch_components import AbstractExceptionHandler
from ask_sdk_core.handler_input import HandlerInput
from ask_sdk_core.utils import is_intent_name, get_slot_value

from ask_sdk_model import Response
from session_state import *

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


BASE_URL = "https://alexastudyingassistant.herokuapp.com"
SESSIONS = {}


class LaunchRequestHandler(AbstractRequestHandler):
    """Handler for Skill Launch."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool

        return ask_utils.is_request_type("LaunchRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "Welcome to studying assistant! Ask for a Topic and I'll help you study! If you need help say help."

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class GetAvailableTopicsHandler(AbstractRequestHandler):
    """ Handler for the GetAvailableTopics Intent.
    
        Fetches the available topics from https://alexastudyingassistant.herokuapp.com/api/topics
        URL and prompts them to user.
    """
    
    def can_handle(self, handler_input):
        return ask_utils.is_intent_name("GetAvailableTopics")(handler_input)
        
    def handle(self, handler_input):
        speak_output = "Here are the currently available topics: ..."
        
        topics = req.get(BASE_URL + "/api/topics").json()
        speak_output += "... ".join([topic["name"] for topic in topics])
        speak_output += ". If the topic you wish to practice was not listed above, ask for help."
        
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class StartTopicHandler(AbstractRequestHandler):
    """ Handler for the StartTopics Intent.
    
        Given a topic name in the SLOT, fetch all the questions available from the asa webapp.
    """
    
    def can_handle(self, handler_input):
        return ask_utils.is_intent_name("StartTopic")(handler_input)
        
    def handle(self, handler_input):
        topic = get_slot_value(handler_input=handler_input, slot_name="topic").lower()
        topics_with_id = req.get(BASE_URL + "/api/topics").json()
        topics = [topic["name"].lower() for topic in topics_with_id]

        if topic in topics:
            speak_output = "Let's start! "
            topic_id = topics_with_id[topics.index(topic)]["_id"]
            questions = req.get(BASE_URL+"/api/questions/"+topic_id).json()
            
            user_id = handler_input.request_envelope.session.user.user_id
            
            if user_id not in SESSIONS.keys():
                SESSIONS[user_id] = SessionState(topic, questions)              
            else:
                if topic not in SESSIONS[user_id].categories.keys():
                    SESSIONS[user_id].load_new_category(topic, questions)
                else:
                    speak_output += "You've answered all questions on this topic. Going back to last topic... "
            
            speak_output += SESSIONS[user_id].stringify_question()
            if not speak_output:
                speak_output = "There are no more questions available. Please choose another topic."
            
            return (
                handler_input.response_builder
                    .speak(speak_output)
                    .ask(speak_output)
                    .response
            )
                
        speak_output = topic + " was not found. Ask for different topic or for help."
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class AnswerQuestionHandler(AbstractRequestHandler):
    """Handler for Help Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("AnswerQuestion")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "You've answered a question! "
        answer = int(get_slot_value(handler_input=handler_input, slot_name="answer"))
        user_id = handler_input.request_envelope.session.user.user_id

        num_of_answers = len(SESSIONS[user_id].current_question["answers"])
        correct = SESSIONS[user_id].current_question["correct"]
        
        if answer < 1 or answer > num_of_answers:
            speak_output = f"You only had {num_of_answers} possible answers"
        else:
            if answer == correct +1:
                SESSIONS[user_id].inc_score(True)
                speak_output = "Correct! ..."
            else:
                SESSIONS[user_id].inc_score(False)
                speak_output = f"Sorry, the correct answer should have been: {correct}: "
                speak_output += SESSIONS[user_id].current_question["answers"][correct]
                speak_output += "... "
            
            SESSIONS[user_id].set_next_question()
            new_question = SESSIONS[user_id].stringify_question()
            
            if not new_question:
                speak_output += "You've answered all questions in this topic, please pick a new one or quit."
            else:
                speak_output += new_question
            

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class HelpIntentHandler(AbstractRequestHandler):
    """Handler for Help Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "Studying Assistant helps you study and practice by prompting you "
        speak_output += "with multiple choice questions. "
        speak_output += "To get started register and create or upload questions to a new topic at "
        speak_output += BASE_URL + " . "
        speak_output += "Then start this skill and ask for help studying followed by the topic's name"

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class CancelOrStopIntentHandler(AbstractRequestHandler):
    """Single handler for Cancel and Stop Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return (ask_utils.is_intent_name("AMAZON.CancelIntent")(handler_input) or
                ask_utils.is_intent_name("AMAZON.StopIntent")(handler_input))

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        user_id = handler_input.request_envelope.session.user.user_id
        score = SESSIONS[user_id].get_score()
        speak_output = f"Well done! Your score in this session was {score} percent."

        return (
            handler_input.response_builder
                .speak(speak_output)
                .response
        )


class SessionEndedRequestHandler(AbstractRequestHandler):
    """Handler for Session End."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        user_id = handler_input.request_envelope.session.user.user_id
        score = SESSIONS[user_id].get_score()
        speak_output = f"Well done! Your score in this session was {score} percent."

        # Any cleanup logic goes here.

        return handler_input.response_builder.speak(speak_output).response


class IntentReflectorHandler(AbstractRequestHandler):
    """The intent reflector is used for interaction model testing and debugging.
    It will simply repeat the intent the user said. You can create custom handlers
    for your intents by defining them above, then also adding them to the request
    handler chain below.
    """
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_request_type("IntentRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        intent_name = ask_utils.get_intent_name(handler_input)
        speak_output = "Something went wrong. "
        speak_output = "You just triggered " + intent_name + "."

        return (
            handler_input.response_builder
                .speak(speak_output)
                # .ask("add a reprompt if you want to keep the session open for the user to respond")
                .response
        )


class CatchAllExceptionHandler(AbstractExceptionHandler):
    """Generic error handling to capture any syntax or routing errors. If you receive an error
    stating the request handler chain is not found, you have not implemented a handler for
    the intent being invoked or included it in the skill builder below.
    """
    def can_handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> bool
        return True

    def handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> Response
        logger.error(exception, exc_info=True)

        speak_output = "Sorry, I had trouble doing what you asked. Please try again."

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )

# The SkillBuilder object acts as the entry point for your skill, routing all request and response
# payloads to the handlers above. Make sure any new handlers or interceptors you've
# defined are included below. The order matters - they're processed top to bottom.


sb = SkillBuilder()

sb.add_request_handler(LaunchRequestHandler())
sb.add_request_handler(GetAvailableTopicsHandler())
sb.add_request_handler(StartTopicHandler())
sb.add_request_handler(AnswerQuestionHandler())
sb.add_request_handler(HelpIntentHandler())
sb.add_request_handler(CancelOrStopIntentHandler())
sb.add_request_handler(SessionEndedRequestHandler())
sb.add_request_handler(IntentReflectorHandler()) # make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers

sb.add_exception_handler(CatchAllExceptionHandler())

lambda_handler = sb.lambda_handler()