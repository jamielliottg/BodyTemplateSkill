'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const makeRichText = Alexa.utils.TextUtils.makeRichText;

var fillerTextContent ="Nobody is going to read or hear this. At least, I hope not. Because, if they do, they'll realise that they have learned nothing of value.";
var imgAddress = "https://imgs.xkcd.com/comics/standards.png";

const handlers = {
    'LaunchRequest': function () {
        var speechOutput = "Hi there. How can I help?";
        var reprompt = "How can I help?";
        
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(":responseReady");
    },
    'ElementSelected': function () {
        if (this.event.request.token == 'one')
        {
            var speechOutput = "You have selected " + this.event.request.token;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
        else if (this.event.request.token == 'two')
        {
            const bodyTemplate3 = new Alexa.templateBuilders.BodyTemplate3Builder();
                    
            var template = bodyTemplate3.setTitle("Body Template 3 Title")
                                .setTextContent(makePlainText(fillerTextContent))
                                .setImage(makeImage(imgAddress))
                                .build();
                                
            this.response.speak("Rendering Body Template 3")
                                .renderTemplate(template)
                                .shouldEndSession(null);
            this.emit(":responseReady");
        }
    },
    'BodyTemplateIntent': function () {
        var userNumber;
        
        if (this.event.request.intent.slots.numberValue.value)
            userNumber = this.event.request.intent.slots.numberValue.value;
            
        if (userNumber)
        {
            if (supportsDisplay.call(this))
            {
                if (userNumber == 2)
                {
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                    var template = bodyTemplate2.setTitle("Body Template 2 Title")
                                        .setTextContent(makePlainText(fillerTextContent), makeRichText("<action value ='one'>Press me to hear something!</action>"),
                                        makeRichText("<action value ='two'>Press me to see another body template!</action>"))
                                        .setImage(makeImage(imgAddress))
                                        .build();
                                        
                    this.response.speak("Rendering Body Template 2")
                                        .renderTemplate(template)
                                        .shouldEndSession(null);
                    this.emit(":responseReady");
                }
                else if (userNumber == 7)
                {
                    const bodyTemplate7 = new Alexa.templateBuilders.BodyTemplate7Builder();
                    
                    var template = bodyTemplate7.setTitle("Body Template 2 Title")
                                        .setImage(makeImage(imgAddress))
                                        .build();
                                        
                    this.response.speak("Rendering Body Template 7")
                                        .renderTemplate(template)
                                        .shouldEndSession(null);
                    this.emit(":responseReady");
                }
            }
            else
            {
                var speechOutput = fillerTextContent + " What would you like?";
                var reprompt = "What would you like?";
            
                this.response.speak(speechOutput);
                this.response.listen(reprompt);
                this.emit(":responseReady");
            }
        }
        else
        {
            var speechOutput = "Sorry, I didn't quite get that. What would you like?";
            var reprompt = "What would you like?";
        
            this.response.speak(speechOutput);
            this.response.listen(reprompt);
            this.emit(":responseReady");
        }
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function supportsDisplay() {
    var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

    return hasDisplay;
}
