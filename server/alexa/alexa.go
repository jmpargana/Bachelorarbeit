package main

import alexa "github.com/aws/aws-lambda-go/lambda"

var Applications = map[string]interface{}{
	"/echo/helloworld": alexa.EchoApplication{
		AppID:    "xxxxx", // Echo App ID from Amazon Dashboard
		OnIntent: EchoIntentHandler,
		OnLaunch: EchoIntentLauncher,
	},
}

func main() {
	alexa.Run(Applications, "3000")
}

func EchoIntentHandler(echoReq *alexa.EchoRequest, echoResp *alexa.EchoResponse) {
	echoResp.OutputSpeech("Hello world from my new Echo test app!").Card("Hello World", "This is a test card.")
}
