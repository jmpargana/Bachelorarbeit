class SessionState():
    """ SessionState holds a the score, and lists of questions a user
        has left to answer for each of the topics.
    """

    def __init__(self, category, questions):
        self.num_of_questions = 0
        self.num_of_right_answers = 0
        self.current_category = category
        self.categories = {category: questions}
        self.set_next_question()

    def get_next_question(self):
        self.set_next_question()
        return self.current_question

    def inc_score(self, right):
        if right:
            self.num_of_right_answers += 1
        self.num_of_questions += 1

    def set_next_question(self):
        if self.categories[self.current_category]:
            setter = self.categories[self.current_category].pop()
        else:
            setter = None
        self.current_question = setter

    def load_new_category(self, category, questions):
        self.categories[category] = questions
        self.current_category = category
        self.set_next_question()

    def get_score(self):
        if self.num_of_right_answers != 0:
            return self.num_of_right_answers / self.num_of_questions * 100
        return 0

    def stringify_question(self):
        if not self.current_question:
            return None

        answer = self.current_question["question"]
        answer += " "
        for i, v in enumerate(self.current_question["answers"]):
            answer += f"{i+1}: {v}... "
        return answer

    def new_category(self, category, questions):
        self.categories[category] = questions
        self.current_category = category
        self.current_question = self.get_next_question()
