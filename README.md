# 2800-202510-BBY08

**TABLE OF CONTENTS**
## About Us
## Project Title
## Project Description
## Technologies Used
## File Contents
## How to install & run the project
## Features (How to use the product)
## Credits, References, Licenses
## How did we use AI or any API's
## Contact Information

## About Us
Team Name: BBY-08
Team Members: 
- Shivaun
- Luka 
- Ana
- Wynn
- Isabel

## Project Title
BeCool

## Project Description 
BeCool is a web application that helps users locate, donate to, and access community fridges and pantries, supporting local food sharing and reducing waste.

## Technologies Used
Frontend:
- HTML
- CSS
- JavaScript
- Bootstrap

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL
- Aiven (To host database)

Other Tools & APIs:
- Google Maps API
- Cloudinary
- Huggingface
- Figma
- Trello
- Git & Github

## File Contents
C:.
│   .env
│   .gitignore
│   api.js
│   authentication.js
│   authorization.js
│   ca.pem
│   create_manageStorage.js
│   eslint.config.mjs
│   index.js
│   notification-emails.js
│   package-lock.json
│   package.json
│   profile_route.js
│   README.md
│   review_reply.js
│   Tree.txt
│   utils.js
│
├───.vscode
│       settings.json
│
├───css
│       404.css
│       about.css
│       addreview.css
│       app.css
│       browse.css
│       contents-modal.css
│       contents.css
│       create_new.css
│       footer.css
│       header.css
│       index.css
│       login.css
│       manage.css
│       map.css
│       profile.css
│       reviews.css
│
├───data
│       datasets.json
│       food_classification_tests.txt
│
├───html
├───img
│       becoolfavicon.ico
│       becool_dark.png
│       becool_light.png
│       becool_solid.png
│       hero_fridge.png
│       index_circle.svg
│       index_curve.svg
│
├───js
│       authentication-client.js
│       browse.js
│       city.js
│       config.js
│       contents.js
│       contentTabs.js
│       create_new.js
│       food-classify.js
│       food_classify_tuning.js
│       header.js
│       help.js
│       imageUploadUtil.js
│       locational.js
│       manage.js
│       profile.js
│       reviews.js
│       userLocation.js
│
├───node_modules
│   │   .package-lock.json
│   │
│   ├───.bin
│   │       color-support
│   │       color-support.cmd
│   │       color-support.ps1
│   │       ejs
│   │       ejs.cmd
│   │       ejs.ps1
│   │       jake
│   │       jake.cmd
│   │       jake.ps1
│   │       mkdirp
│   │       mkdirp.cmd
│   │       mkdirp.ps1
│   │       node-pre-gyp
│   │       node-pre-gyp.cmd
│   │       node-pre-gyp.ps1
│   │       nodemon
│   │       nodemon.cmd
│   │       nodemon.ps1
│   │       nodetouch
│   │       nodetouch.cmd
│   │       nodetouch.ps1
│   │       nopt
│   │       nopt.cmd
│   │       nopt.ps1
│   │       rimraf
│   │       rimraf.cmd
│   │       rimraf.ps1
│   │       semver
│   │       semver.cmd
│   │       semver.ps1
│   │
│   ├───@huggingface
│   │   ├───inference
│   │   │   │   LICENSE
│   │   │   │   package.json
│   │   │   │   README.md
│   │   │   │
│   │   │   ├───dist
│   │   │   │   │   index.cjs
│   │   │   │   │   index.js
│   │   │   │   │
│   │   │   │   ├───src
│   │   │   │   │   │   config.d.ts
│   │   │   │   │   │   config.d.ts.map
│   │   │   │   │   │   index.d.ts
│   │   │   │   │   │   index.d.ts.map
│   │   │   │   │   │   InferenceClient.d.ts
│   │   │   │   │   │   InferenceClient.d.ts.map
│   │   │   │   │   │   types.d.ts
│   │   │   │   │   │   types.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   ├───lib
│   │   │   │   │   │       getDefaultTask.d.ts
│   │   │   │   │   │       getDefaultTask.d.ts.map
│   │   │   │   │   │       getInferenceProviderMapping.d.ts
│   │   │   │   │   │       getInferenceProviderMapping.d.ts.map
│   │   │   │   │   │       getProviderHelper.d.ts
│   │   │   │   │   │       getProviderHelper.d.ts.map
│   │   │   │   │   │       InferenceOutputError.d.ts
│   │   │   │   │   │       InferenceOutputError.d.ts.map
│   │   │   │   │   │       isUrl.d.ts
│   │   │   │   │   │       isUrl.d.ts.map
│   │   │   │   │   │       makeRequestOptions.d.ts
│   │   │   │   │   │       makeRequestOptions.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   ├───providers
│   │   │   │   │   │       black-forest-labs.d.ts
│   │   │   │   │   │       black-forest-labs.d.ts.map
│   │   │   │   │   │       cerebras.d.ts
│   │   │   │   │   │       cerebras.d.ts.map
│   │   │   │   │   │       cohere.d.ts
│   │   │   │   │   │       cohere.d.ts.map
│   │   │   │   │   │       consts.d.ts
│   │   │   │   │   │       consts.d.ts.map
│   │   │   │   │   │       fal-ai.d.ts
│   │   │   │   │   │       fal-ai.d.ts.map
│   │   │   │   │   │       featherless-ai.d.ts
│   │   │   │   │   │       featherless-ai.d.ts.map
│   │   │   │   │   │       fireworks-ai.d.ts
│   │   │   │   │   │       fireworks-ai.d.ts.map
│   │   │   │   │   │       groq.d.ts
│   │   │   │   │   │       groq.d.ts.map
│   │   │   │   │   │       hf-inference.d.ts
│   │   │   │   │   │       hf-inference.d.ts.map
│   │   │   │   │   │       hyperbolic.d.ts
│   │   │   │   │   │       hyperbolic.d.ts.map
│   │   │   │   │   │       nebius.d.ts
│   │   │   │   │   │       nebius.d.ts.map
│   │   │   │   │   │       novita.d.ts
│   │   │   │   │   │       novita.d.ts.map
│   │   │   │   │   │       nscale.d.ts
│   │   │   │   │   │       nscale.d.ts.map
│   │   │   │   │   │       openai.d.ts
│   │   │   │   │   │       openai.d.ts.map
│   │   │   │   │   │       ovhcloud.d.ts
│   │   │   │   │   │       ovhcloud.d.ts.map
│   │   │   │   │   │       providerHelper.d.ts
│   │   │   │   │   │       providerHelper.d.ts.map
│   │   │   │   │   │       replicate.d.ts
│   │   │   │   │   │       replicate.d.ts.map
│   │   │   │   │   │       sambanova.d.ts
│   │   │   │   │   │       sambanova.d.ts.map
│   │   │   │   │   │       together.d.ts
│   │   │   │   │   │       together.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   ├───snippets
│   │   │   │   │   │       getInferenceSnippets.d.ts
│   │   │   │   │   │       getInferenceSnippets.d.ts.map
│   │   │   │   │   │       index.d.ts
│   │   │   │   │   │       index.d.ts.map
│   │   │   │   │   │       templates.exported.d.ts
│   │   │   │   │   │       templates.exported.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   ├───tasks
│   │   │   │   │   │   │   index.d.ts
│   │   │   │   │   │   │   index.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   ├───audio
│   │   │   │   │   │   │       audioClassification.d.ts
│   │   │   │   │   │   │       audioClassification.d.ts.map
│   │   │   │   │   │   │       audioToAudio.d.ts
│   │   │   │   │   │   │       audioToAudio.d.ts.map
│   │   │   │   │   │   │       automaticSpeechRecognition.d.ts
│   │   │   │   │   │   │       automaticSpeechRecognition.d.ts.map
│   │   │   │   │   │   │       textToSpeech.d.ts
│   │   │   │   │   │   │       textToSpeech.d.ts.map
│   │   │   │   │   │   │       utils.d.ts
│   │   │   │   │   │   │       utils.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   ├───custom
│   │   │   │   │   │   │       request.d.ts
│   │   │   │   │   │   │       request.d.ts.map
│   │   │   │   │   │   │       streamingRequest.d.ts
│   │   │   │   │   │   │       streamingRequest.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   ├───cv
│   │   │   │   │   │   │       imageClassification.d.ts
│   │   │   │   │   │   │       imageClassification.d.ts.map
│   │   │   │   │   │   │       imageSegmentation.d.ts
│   │   │   │   │   │   │       imageSegmentation.d.ts.map
│   │   │   │   │   │   │       imageToImage.d.ts
│   │   │   │   │   │   │       imageToImage.d.ts.map
│   │   │   │   │   │   │       imageToText.d.ts
│   │   │   │   │   │   │       imageToText.d.ts.map
│   │   │   │   │   │   │       objectDetection.d.ts
│   │   │   │   │   │   │       objectDetection.d.ts.map
│   │   │   │   │   │   │       textToImage.d.ts
│   │   │   │   │   │   │       textToImage.d.ts.map
│   │   │   │   │   │   │       textToVideo.d.ts
│   │   │   │   │   │   │       textToVideo.d.ts.map
│   │   │   │   │   │   │       utils.d.ts
│   │   │   │   │   │   │       utils.d.ts.map
│   │   │   │   │   │   │       zeroShotImageClassification.d.ts
│   │   │   │   │   │   │       zeroShotImageClassification.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   ├───multimodal
│   │   │   │   │   │   │       documentQuestionAnswering.d.ts
│   │   │   │   │   │   │       documentQuestionAnswering.d.ts.map
│   │   │   │   │   │   │       visualQuestionAnswering.d.ts
│   │   │   │   │   │   │       visualQuestionAnswering.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   ├───nlp
│   │   │   │   │   │   │       chatCompletion.d.ts
│   │   │   │   │   │   │       chatCompletion.d.ts.map
│   │   │   │   │   │   │       chatCompletionStream.d.ts
│   │   │   │   │   │   │       chatCompletionStream.d.ts.map
│   │   │   │   │   │   │       featureExtraction.d.ts
│   │   │   │   │   │   │       featureExtraction.d.ts.map
│   │   │   │   │   │   │       fillMask.d.ts
│   │   │   │   │   │   │       fillMask.d.ts.map
│   │   │   │   │   │   │       questionAnswering.d.ts
│   │   │   │   │   │   │       questionAnswering.d.ts.map
│   │   │   │   │   │   │       sentenceSimilarity.d.ts
│   │   │   │   │   │   │       sentenceSimilarity.d.ts.map
│   │   │   │   │   │   │       summarization.d.ts
│   │   │   │   │   │   │       summarization.d.ts.map
│   │   │   │   │   │   │       tableQuestionAnswering.d.ts
│   │   │   │   │   │   │       tableQuestionAnswering.d.ts.map
│   │   │   │   │   │   │       textClassification.d.ts
│   │   │   │   │   │   │       textClassification.d.ts.map
│   │   │   │   │   │   │       textGeneration.d.ts
│   │   │   │   │   │   │       textGeneration.d.ts.map
│   │   │   │   │   │   │       textGenerationStream.d.ts
│   │   │   │   │   │   │       textGenerationStream.d.ts.map
│   │   │   │   │   │   │       tokenClassification.d.ts
│   │   │   │   │   │   │       tokenClassification.d.ts.map
│   │   │   │   │   │   │       translation.d.ts
│   │   │   │   │   │   │       translation.d.ts.map
│   │   │   │   │   │   │       zeroShotClassification.d.ts
│   │   │   │   │   │   │       zeroShotClassification.d.ts.map
│   │   │   │   │   │   │
│   │   │   │   │   │   └───tabular
│   │   │   │   │   │           tabularClassification.d.ts
│   │   │   │   │   │           tabularClassification.d.ts.map
│   │   │   │   │   │           tabularRegression.d.ts
│   │   │   │   │   │           tabularRegression.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   ├───utils
│   │   │   │   │   │       base64FromBytes.d.ts
│   │   │   │   │   │       base64FromBytes.d.ts.map
│   │   │   │   │   │       delay.d.ts
│   │   │   │   │   │       delay.d.ts.map
│   │   │   │   │   │       distributive-omit.d.ts
│   │   │   │   │   │       distributive-omit.d.ts.map
│   │   │   │   │   │       isBackend.d.ts
│   │   │   │   │   │       isBackend.d.ts.map
│   │   │   │   │   │       isFrontend.d.ts
│   │   │   │   │   │       isFrontend.d.ts.map
│   │   │   │   │   │       omit.d.ts
│   │   │   │   │   │       omit.d.ts.map
│   │   │   │   │   │       pick.d.ts
│   │   │   │   │   │       pick.d.ts.map
│   │   │   │   │   │       request.d.ts
│   │   │   │   │   │       request.d.ts.map
│   │   │   │   │   │       toArray.d.ts
│   │   │   │   │   │       toArray.d.ts.map
│   │   │   │   │   │       typedEntries.d.ts
│   │   │   │   │   │       typedEntries.d.ts.map
│   │   │   │   │   │       typedInclude.d.ts
│   │   │   │   │   │       typedInclude.d.ts.map
│   │   │   │   │   │
│   │   │   │   │   └───vendor
│   │   │   │   │       └───fetch-event-source
│   │   │   │   │               parse.d.ts
│   │   │   │   │               parse.d.ts.map
│   │   │   │   │               parse.spec.d.ts
│   │   │   │   │               parse.spec.d.ts.map
│   │   │   │   │
│   │   │   │   └───test
│   │   │   │           expect-closeto.d.ts
│   │   │   │           expect-closeto.d.ts.map
│   │   │   │           InferenceClient.spec.d.ts
│   │   │   │           InferenceClient.spec.d.ts.map
│   │   │   │           test-files.d.ts
│   │   │   │           test-files.d.ts.map
│   │   │   │
│   │   │   └───src
│   │   │       │   config.ts
│   │   │       │   index.ts
│   │   │       │   InferenceClient.ts
│   │   │       │   types.ts
│   │   │       │
│   │   │       ├───lib
│   │   │       │       getDefaultTask.ts
│   │   │       │       getInferenceProviderMapping.ts
│   │   │       │       getProviderHelper.ts
│   │   │       │       InferenceOutputError.ts
│   │   │       │       isUrl.ts
│   │   │       │       makeRequestOptions.ts
│   │   │       │
│   │   │       ├───providers
│   │   │       │       black-forest-labs.ts
│   │   │       │       cerebras.ts
│   │   │       │       cohere.ts
│   │   │       │       consts.ts
│   │   │       │       fal-ai.ts
│   │   │       │       featherless-ai.ts
│   │   │       │       fireworks-ai.ts
│   │   │       │       groq.ts
│   │   │       │       hf-inference.ts
│   │   │       │       hyperbolic.ts
│   │   │       │       nebius.ts
│   │   │       │       novita.ts
│   │   │       │       nscale.ts
│   │   │       │       openai.ts
│   │   │       │       ovhcloud.ts
│   │   │       │       providerHelper.ts
│   │   │       │       replicate.ts
│   │   │       │       sambanova.ts
│   │   │       │       together.ts
│   │   │       │
│   │   │       ├───snippets
│   │   │       │       getInferenceSnippets.ts
│   │   │       │       index.ts
│   │   │       │       templates.exported.ts
│   │   │       │
│   │   │       ├───tasks
│   │   │       │   │   index.ts
│   │   │       │   │
│   │   │       │   ├───audio
│   │   │       │   │       audioClassification.ts
│   │   │       │   │       audioToAudio.ts
│   │   │       │   │       automaticSpeechRecognition.ts
│   │   │       │   │       textToSpeech.ts
│   │   │       │   │       utils.ts
│   │   │       │   │
│   │   │       │   ├───custom
│   │   │       │   │       request.ts
│   │   │       │   │       streamingRequest.ts
│   │   │       │   │
│   │   │       │   ├───cv
│   │   │       │   │       imageClassification.ts
│   │   │       │   │       imageSegmentation.ts
│   │   │       │   │       imageToImage.ts
│   │   │       │   │       imageToText.ts
│   │   │       │   │       objectDetection.ts
│   │   │       │   │       textToImage.ts
│   │   │       │   │       textToVideo.ts
│   │   │       │   │       utils.ts
│   │   │       │   │       zeroShotImageClassification.ts
│   │   │       │   │
│   │   │       │   ├───multimodal
│   │   │       │   │       documentQuestionAnswering.ts
│   │   │       │   │       visualQuestionAnswering.ts
│   │   │       │   │
│   │   │       │   ├───nlp
│   │   │       │   │       chatCompletion.ts
│   │   │       │   │       chatCompletionStream.ts
│   │   │       │   │       featureExtraction.ts
│   │   │       │   │       fillMask.ts
│   │   │       │   │       questionAnswering.ts
│   │   │       │   │       sentenceSimilarity.ts
│   │   │       │   │       summarization.ts
│   │   │       │   │       tableQuestionAnswering.ts
│   │   │       │   │       textClassification.ts
│   │   │       │   │       textGeneration.ts
│   │   │       │   │       textGenerationStream.ts
│   │   │       │   │       tokenClassification.ts
│   │   │       │   │       translation.ts
│   │   │       │   │       zeroShotClassification.ts
│   │   │       │   │
│   │   │       │   └───tabular
│   │   │       │           tabularClassification.ts
│   │   │       │           tabularRegression.ts
│   │   │       │
│   │   │       ├───utils
│   │   │       │       base64FromBytes.ts
│   │   │       │       delay.ts
│   │   │       │       distributive-omit.ts
│   │   │       │       isBackend.ts
│   │   │       │       isFrontend.ts
│   │   │       │       omit.ts
│   │   │       │       pick.ts
│   │   │       │       request.ts
│   │   │       │       toArray.ts
│   │   │       │       typedEntries.ts
│   │   │       │       typedInclude.ts
│   │   │       │
│   │   │       └───vendor
│   │   │           └───fetch-event-source
│   │   │                   LICENSE
│   │   │                   parse.spec.ts
│   │   │                   parse.ts
│   │   │
│   │   ├───jinja
│   │   │   │   LICENSE
│   │   │   │   package.json
│   │   │   │   README.md
│   │   │   │   tsconfig.json
│   │   │   │
│   │   │   ├───dist
│   │   │   │       ast.d.ts
│   │   │   │       ast.d.ts.map
│   │   │   │       format.d.ts
│   │   │   │       format.d.ts.map
│   │   │   │       index.cjs
│   │   │   │       index.d.ts
│   │   │   │       index.d.ts.map
│   │   │   │       index.js
│   │   │   │       lexer.d.ts
│   │   │   │       lexer.d.ts.map
│   │   │   │       parser.d.ts
│   │   │   │       parser.d.ts.map
│   │   │   │       runtime.d.ts
│   │   │   │       runtime.d.ts.map
│   │   │   │       utils.d.ts
│   │   │   │       utils.d.ts.map
│   │   │   │
│   │   │   └───src
│   │   │           ast.ts
│   │   │           format.ts
│   │   │           index.ts
│   │   │           lexer.ts
│   │   │           parser.ts
│   │   │           runtime.ts
│   │   │           utils.ts
│   │   │
│   │   └───tasks
│   │       │   LICENSE
│   │       │   package.json
│   │       │   README.md
│   │       │   tsconfig.json
│   │       │
│   │       ├───dist
│   │       │   ├───commonjs
│   │       │   │   │   dataset-libraries.d.ts
│   │       │   │   │   dataset-libraries.d.ts.map
│   │       │   │   │   dataset-libraries.js
│   │       │   │   │   default-widget-inputs.d.ts
│   │       │   │   │   default-widget-inputs.d.ts.map
│   │       │   │   │   default-widget-inputs.js
│   │       │   │   │   gguf.d.ts
│   │       │   │   │   gguf.d.ts.map
│   │       │   │   │   gguf.js
│   │       │   │   │   hardware.d.ts
│   │       │   │   │   hardware.d.ts.map
│   │       │   │   │   hardware.js
│   │       │   │   │   index.d.ts
│   │       │   │   │   index.d.ts.map
│   │       │   │   │   index.js
│   │       │   │   │   inference-providers.d.ts
│   │       │   │   │   inference-providers.d.ts.map
│   │       │   │   │   inference-providers.js
│   │       │   │   │   library-to-tasks.d.ts
│   │       │   │   │   library-to-tasks.d.ts.map
│   │       │   │   │   library-to-tasks.js
│   │       │   │   │   local-apps.d.ts
│   │       │   │   │   local-apps.d.ts.map
│   │       │   │   │   local-apps.js
│   │       │   │   │   local-apps.spec.d.ts
│   │       │   │   │   local-apps.spec.d.ts.map
│   │       │   │   │   local-apps.spec.js
│   │       │   │   │   model-data.d.ts
│   │       │   │   │   model-data.d.ts.map
│   │       │   │   │   model-data.js
│   │       │   │   │   model-libraries-downloads.d.ts
│   │       │   │   │   model-libraries-downloads.d.ts.map
│   │       │   │   │   model-libraries-downloads.js
│   │       │   │   │   model-libraries-snippets.d.ts
│   │       │   │   │   model-libraries-snippets.d.ts.map
│   │       │   │   │   model-libraries-snippets.js
│   │       │   │   │   model-libraries-snippets.spec.d.ts
│   │       │   │   │   model-libraries-snippets.spec.d.ts.map
│   │       │   │   │   model-libraries-snippets.spec.js
│   │       │   │   │   model-libraries.d.ts
│   │       │   │   │   model-libraries.d.ts.map
│   │       │   │   │   model-libraries.js
│   │       │   │   │   package.json
│   │       │   │   │   pipelines.d.ts
│   │       │   │   │   pipelines.d.ts.map
│   │       │   │   │   pipelines.js
│   │       │   │   │   tokenizer-data.d.ts
│   │       │   │   │   tokenizer-data.d.ts.map
│   │       │   │   │   tokenizer-data.js
│   │       │   │   │   widget-example.d.ts
│   │       │   │   │   widget-example.d.ts.map
│   │       │   │   │   widget-example.js
│   │       │   │   │
│   │       │   │   ├───snippets
│   │       │   │   │       common.d.ts
│   │       │   │   │       common.d.ts.map
│   │       │   │   │       common.js
│   │       │   │   │       index.d.ts
│   │       │   │   │       index.d.ts.map
│   │       │   │   │       index.js
│   │       │   │   │       inputs.d.ts
│   │       │   │   │       inputs.d.ts.map
│   │       │   │   │       inputs.js
│   │       │   │   │       types.d.ts
│   │       │   │   │       types.d.ts.map
│   │       │   │   │       types.js
│   │       │   │   │
│   │       │   │   └───tasks
│   │       │   │       │   index.d.ts
│   │       │   │       │   index.d.ts.map
│   │       │   │       │   index.js
│   │       │   │       │
│   │       │   │       ├───any-to-any
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───audio-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───audio-to-audio
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───automatic-speech-recognition
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───chat-completion
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───depth-estimation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───document-question-answering
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───feature-extraction
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───fill-mask
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───image-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───image-feature-extraction
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───image-segmentation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───image-text-to-text
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───image-to-3d
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───image-to-image
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───image-to-text
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───keypoint-detection
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───mask-generation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───object-detection
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───placeholder
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───question-answering
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───reinforcement-learning
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───sentence-similarity
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───summarization
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───table-question-answering
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───tabular-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───tabular-regression
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───text-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text-generation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text-ranking
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───text-to-3d
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───text-to-audio
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text-to-image
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text-to-speech
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text-to-video
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───text2text-generation
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───token-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───translation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───unconditional-image-generation
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───video-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───video-text-to-text
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───visual-document-retrieval
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │
│   │       │   │       ├───visual-question-answering
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───zero-shot-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       ├───zero-shot-image-classification
│   │       │   │       │       data.d.ts
│   │       │   │       │       data.d.ts.map
│   │       │   │       │       data.js
│   │       │   │       │       inference.d.ts
│   │       │   │       │       inference.d.ts.map
│   │       │   │       │       inference.js
│   │       │   │       │
│   │       │   │       └───zero-shot-object-detection
│   │       │   │               data.d.ts
│   │       │   │               data.d.ts.map
│   │       │   │               data.js
│   │       │   │               inference.d.ts
│   │       │   │               inference.d.ts.map
│   │       │   │               inference.js
│   │       │   │
│   │       │   └───esm
│   │       │       │   dataset-libraries.d.ts
│   │       │       │   dataset-libraries.d.ts.map
│   │       │       │   dataset-libraries.js
│   │       │       │   default-widget-inputs.d.ts
│   │       │       │   default-widget-inputs.d.ts.map
│   │       │       │   default-widget-inputs.js
│   │       │       │   gguf.d.ts
│   │       │       │   gguf.d.ts.map
│   │       │       │   gguf.js
│   │       │       │   hardware.d.ts
│   │       │       │   hardware.d.ts.map
│   │       │       │   hardware.js
│   │       │       │   index.d.ts
│   │       │       │   index.d.ts.map
│   │       │       │   index.js
│   │       │       │   inference-providers.d.ts
│   │       │       │   inference-providers.d.ts.map
│   │       │       │   inference-providers.js
│   │       │       │   library-to-tasks.d.ts
│   │       │       │   library-to-tasks.d.ts.map
│   │       │       │   library-to-tasks.js
│   │       │       │   local-apps.d.ts
│   │       │       │   local-apps.d.ts.map
│   │       │       │   local-apps.js
│   │       │       │   local-apps.spec.d.ts
│   │       │       │   local-apps.spec.d.ts.map
│   │       │       │   local-apps.spec.js
│   │       │       │   model-data.d.ts
│   │       │       │   model-data.d.ts.map
│   │       │       │   model-data.js
│   │       │       │   model-libraries-downloads.d.ts
│   │       │       │   model-libraries-downloads.d.ts.map
│   │       │       │   model-libraries-downloads.js
│   │       │       │   model-libraries-snippets.d.ts
│   │       │       │   model-libraries-snippets.d.ts.map
│   │       │       │   model-libraries-snippets.js
│   │       │       │   model-libraries-snippets.spec.d.ts
│   │       │       │   model-libraries-snippets.spec.d.ts.map
│   │       │       │   model-libraries-snippets.spec.js
│   │       │       │   model-libraries.d.ts
│   │       │       │   model-libraries.d.ts.map
│   │       │       │   model-libraries.js
│   │       │       │   package.json
│   │       │       │   pipelines.d.ts
│   │       │       │   pipelines.d.ts.map
│   │       │       │   pipelines.js
│   │       │       │   tokenizer-data.d.ts
│   │       │       │   tokenizer-data.d.ts.map
│   │       │       │   tokenizer-data.js
│   │       │       │   widget-example.d.ts
│   │       │       │   widget-example.d.ts.map
│   │       │       │   widget-example.js
│   │       │       │
│   │       │       ├───snippets
│   │       │       │       common.d.ts
│   │       │       │       common.d.ts.map
│   │       │       │       common.js
│   │       │       │       index.d.ts
│   │       │       │       index.d.ts.map
│   │       │       │       index.js
│   │       │       │       inputs.d.ts
│   │       │       │       inputs.d.ts.map
│   │       │       │       inputs.js
│   │       │       │       types.d.ts
│   │       │       │       types.d.ts.map
│   │       │       │       types.js
│   │       │       │
│   │       │       └───tasks
│   │       │           │   index.d.ts
│   │       │           │   index.d.ts.map
│   │       │           │   index.js
│   │       │           │
│   │       │           ├───any-to-any
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───audio-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───audio-to-audio
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───automatic-speech-recognition
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───chat-completion
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───depth-estimation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───document-question-answering
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───feature-extraction
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───fill-mask
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───image-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───image-feature-extraction
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───image-segmentation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───image-text-to-text
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───image-to-3d
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───image-to-image
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───image-to-text
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───keypoint-detection
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───mask-generation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───object-detection
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───placeholder
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───question-answering
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───reinforcement-learning
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───sentence-similarity
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───summarization
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───table-question-answering
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───tabular-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───tabular-regression
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───text-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text-generation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text-ranking
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───text-to-3d
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───text-to-audio
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text-to-image
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text-to-speech
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text-to-video
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───text2text-generation
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───token-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───translation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───unconditional-image-generation
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───video-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───video-text-to-text
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───visual-document-retrieval
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │
│   │       │           ├───visual-question-answering
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───zero-shot-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           ├───zero-shot-image-classification
│   │       │           │       data.d.ts
│   │       │           │       data.d.ts.map
│   │       │           │       data.js
│   │       │           │       inference.d.ts
│   │       │           │       inference.d.ts.map
│   │       │           │       inference.js
│   │       │           │
│   │       │           └───zero-shot-object-detection
│   │       │                   data.d.ts
│   │       │                   data.d.ts.map
│   │       │                   data.js
│   │       │                   inference.d.ts
│   │       │                   inference.d.ts.map
│   │       │                   inference.js
│   │       │
│   │       └───src
│   │           │   dataset-libraries.ts
│   │           │   default-widget-inputs.ts
│   │           │   gguf.ts
│   │           │   hardware.ts
│   │           │   index.ts
│   │           │   inference-providers.ts
│   │           │   library-to-tasks.ts
│   │           │   local-apps.spec.ts
│   │           │   local-apps.ts
│   │           │   model-data.ts
│   │           │   model-libraries-downloads.ts
│   │           │   model-libraries-snippets.spec.ts
│   │           │   model-libraries-snippets.ts
│   │           │   model-libraries.ts
│   │           │   pipelines.ts
│   │           │   tokenizer-data.ts
│   │           │   widget-example.ts
│   │           │
│   │           ├───snippets
│   │           │       common.ts
│   │           │       index.ts
│   │           │       inputs.ts
│   │           │       types.ts
│   │           │
│   │           └───tasks
│   │               │   common-definitions.json
│   │               │   index.ts
│   │               │
│   │               ├───any-to-any
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───audio-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───audio-to-audio
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───automatic-speech-recognition
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───chat-completion
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │           stream_output.json
│   │               │
│   │               ├───depth-estimation
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───document-question-answering
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───feature-extraction
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───fill-mask
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───image-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───image-feature-extraction
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───image-segmentation
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───image-text-to-text
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───image-to-3d
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───image-to-image
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───image-to-text
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───keypoint-detection
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───mask-generation
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───object-detection
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───placeholder
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───question-answering
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───reinforcement-learning
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───sentence-similarity
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───summarization
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───table-question-answering
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───tabular-classification
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───tabular-regression
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───text-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───text-generation
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │           stream_output.json
│   │               │
│   │               ├───text-ranking
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───text-to-3d
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───text-to-audio
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───text-to-image
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───text-to-speech
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───text-to-video
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───text2text-generation
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───token-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───translation
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───unconditional-image-generation
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───video-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───video-text-to-text
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───visual-document-retrieval
│   │               │       about.md
│   │               │       data.ts
│   │               │
│   │               ├───visual-question-answering
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───zero-shot-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               ├───zero-shot-image-classification
│   │               │   │   about.md
│   │               │   │   data.ts
│   │               │   │   inference.ts
│   │               │   │
│   │               │   └───spec
│   │               │           input.json
│   │               │           output.json
│   │               │
│   │               └───zero-shot-object-detection
│   │                   │   about.md
│   │                   │   data.ts
│   │                   │   inference.ts
│   │                   │
│   │                   └───spec
│   │                           input.json
│   │                           output.json
│   │
│   ├───@mapbox
│   │   └───node-pre-gyp
│   │       │   CHANGELOG.md
│   │       │   contributing.md
│   │       │   LICENSE
│   │       │   package.json
│   │       │   README.md
│   │       │
│   │       ├───.github
│   │       │   └───workflows
│   │       │           codeql.yml
│   │       │
│   │       ├───bin
│   │       │       node-pre-gyp
│   │       │       node-pre-gyp.cmd
│   │       │
│   │       └───lib
│   │           │   build.js
│   │           │   clean.js
│   │           │   configure.js
│   │           │   info.js
│   │           │   install.js
│   │           │   main.js
│   │           │   node-pre-gyp.js
│   │           │   package.js
│   │           │   pre-binding.js
│   │           │   publish.js
│   │           │   rebuild.js
│   │           │   reinstall.js
│   │           │   reveal.js
│   │           │   testbinary.js
│   │           │   testpackage.js
│   │           │   unpublish.js
│   │           │
│   │           └───util
│   │               │   abi_crosswalk.json
│   │               │   compile.js
│   │               │   handle_gyp_opts.js
│   │               │   napi.js
│   │               │   s3_setup.js
│   │               │   versioning.js
│   │               │
│   │               └───nw-pre-gyp
│   │                       index.html
│   │                       package.json
│   │
│   ├───abbrev
│   │       abbrev.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───accepts
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───agent-base
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───dist
│   │   │   └───src
│   │   │           index.d.ts
│   │   │           index.js
│   │   │           index.js.map
│   │   │           promisify.d.ts
│   │   │           promisify.js
│   │   │           promisify.js.map
│   │   │
│   │   └───src
│   │           index.ts
│   │           promisify.ts
│   │
│   ├───ansi-regex
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───ansi-styles
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───anymatch
│   │       index.d.ts
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───append-field
│   │   │   .npmignore
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │       parse-path.js
│   │   │       set-value.js
│   │   │
│   │   └───test
│   │           forms.js
│   │
│   ├───aproba
│   │       CHANGELOG.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───are-we-there-yet
│   │   │   LICENSE.md
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           index.js
│   │           tracker-base.js
│   │           tracker-group.js
│   │           tracker-stream.js
│   │           tracker.js
│   │
│   ├───async
│   │   │   all.js
│   │   │   allLimit.js
│   │   │   allSeries.js
│   │   │   any.js
│   │   │   anyLimit.js
│   │   │   anySeries.js
│   │   │   apply.js
│   │   │   applyEach.js
│   │   │   applyEachSeries.js
│   │   │   asyncify.js
│   │   │   auto.js
│   │   │   autoInject.js
│   │   │   bower.json
│   │   │   cargo.js
│   │   │   cargoQueue.js
│   │   │   CHANGELOG.md
│   │   │   compose.js
│   │   │   concat.js
│   │   │   concatLimit.js
│   │   │   concatSeries.js
│   │   │   constant.js
│   │   │   detect.js
│   │   │   detectLimit.js
│   │   │   detectSeries.js
│   │   │   dir.js
│   │   │   doDuring.js
│   │   │   doUntil.js
│   │   │   doWhilst.js
│   │   │   during.js
│   │   │   each.js
│   │   │   eachLimit.js
│   │   │   eachOf.js
│   │   │   eachOfLimit.js
│   │   │   eachOfSeries.js
│   │   │   eachSeries.js
│   │   │   ensureAsync.js
│   │   │   every.js
│   │   │   everyLimit.js
│   │   │   everySeries.js
│   │   │   filter.js
│   │   │   filterLimit.js
│   │   │   filterSeries.js
│   │   │   find.js
│   │   │   findLimit.js
│   │   │   findSeries.js
│   │   │   flatMap.js
│   │   │   flatMapLimit.js
│   │   │   flatMapSeries.js
│   │   │   foldl.js
│   │   │   foldr.js
│   │   │   forEach.js
│   │   │   forEachLimit.js
│   │   │   forEachOf.js
│   │   │   forEachOfLimit.js
│   │   │   forEachOfSeries.js
│   │   │   forEachSeries.js
│   │   │   forever.js
│   │   │   groupBy.js
│   │   │   groupByLimit.js
│   │   │   groupBySeries.js
│   │   │   index.js
│   │   │   inject.js
│   │   │   LICENSE
│   │   │   log.js
│   │   │   map.js
│   │   │   mapLimit.js
│   │   │   mapSeries.js
│   │   │   mapValues.js
│   │   │   mapValuesLimit.js
│   │   │   mapValuesSeries.js
│   │   │   memoize.js
│   │   │   nextTick.js
│   │   │   package.json
│   │   │   parallel.js
│   │   │   parallelLimit.js
│   │   │   priorityQueue.js
│   │   │   queue.js
│   │   │   race.js
│   │   │   README.md
│   │   │   reduce.js
│   │   │   reduceRight.js
│   │   │   reflect.js
│   │   │   reflectAll.js
│   │   │   reject.js
│   │   │   rejectLimit.js
│   │   │   rejectSeries.js
│   │   │   retry.js
│   │   │   retryable.js
│   │   │   select.js
│   │   │   selectLimit.js
│   │   │   selectSeries.js
│   │   │   seq.js
│   │   │   series.js
│   │   │   setImmediate.js
│   │   │   some.js
│   │   │   someLimit.js
│   │   │   someSeries.js
│   │   │   sortBy.js
│   │   │   timeout.js
│   │   │   times.js
│   │   │   timesLimit.js
│   │   │   timesSeries.js
│   │   │   transform.js
│   │   │   tryEach.js
│   │   │   unmemoize.js
│   │   │   until.js
│   │   │   waterfall.js
│   │   │   whilst.js
│   │   │   wrapSync.js
│   │   │
│   │   ├───dist
│   │   │       async.js
│   │   │       async.min.js
│   │   │       async.mjs
│   │   │
│   │   └───internal
│   │           applyEach.js
│   │           asyncEachOfLimit.js
│   │           awaitify.js
│   │           breakLoop.js
│   │           consoleFunc.js
│   │           createTester.js
│   │           DoublyLinkedList.js
│   │           eachOfLimit.js
│   │           filter.js
│   │           getIterator.js
│   │           Heap.js
│   │           initialParams.js
│   │           isArrayLike.js
│   │           iterator.js
│   │           map.js
│   │           once.js
│   │           onlyOnce.js
│   │           parallel.js
│   │           promiseCallback.js
│   │           queue.js
│   │           range.js
│   │           reject.js
│   │           setImmediate.js
│   │           withoutIndex.js
│   │           wrapAsync.js
│   │
│   ├───balanced-match
│   │   │   index.js
│   │   │   LICENSE.md
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───.github
│   │           FUNDING.yml
│   │
│   ├───bcrypt
│   │   │   .editorconfig
│   │   │   .travis.yml
│   │   │   appveyor.yml
│   │   │   bcrypt.js
│   │   │   binding.gyp
│   │   │   CHANGELOG.md
│   │   │   ISSUE_TEMPLATE.md
│   │   │   LICENSE
│   │   │   Makefile
│   │   │   package.json
│   │   │   promises.js
│   │   │   README.md
│   │   │   SECURITY.md
│   │   │   test-docker.sh
│   │   │
│   │   ├───.github
│   │   │   └───workflows
│   │   │           ci.yaml
│   │   │
│   │   ├───examples
│   │   │       async_compare.js
│   │   │       forever_gen_salt.js
│   │   │
│   │   ├───lib
│   │   │   └───binding
│   │   │       └───napi-v3
│   │   │               bcrypt_lib.node
│   │   │
│   │   ├───src
│   │   │       bcrypt.cc
│   │   │       bcrypt_node.cc
│   │   │       blowfish.cc
│   │   │       node_blf.h
│   │   │
│   │   └───test
│   │           async.test.js
│   │           implementation.test.js
│   │           promise.test.js
│   │           repetitions.test.js
│   │           sync.test.js
│   │
│   ├───binary-extensions
│   │       binary-extensions.json
│   │       binary-extensions.json.d.ts
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───body-parser
│   │   │   HISTORY.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │       │   read.js
│   │       │   utils.js
│   │       │
│   │       └───types
│   │               json.js
│   │               raw.js
│   │               text.js
│   │               urlencoded.js
│   │
│   ├───brace-expansion
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───braces
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           compile.js
│   │           constants.js
│   │           expand.js
│   │           parse.js
│   │           stringify.js
│   │           utils.js
│   │
│   ├───buffer-from
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       readme.md
│   │
│   ├───busboy
│   │   │   .eslintrc.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │   └───workflows
│   │   │           ci.yml
│   │   │           lint.yml
│   │   │
│   │   ├───bench
│   │   │       bench-multipart-fields-100mb-big.js
│   │   │       bench-multipart-fields-100mb-small.js
│   │   │       bench-multipart-files-100mb-big.js
│   │   │       bench-multipart-files-100mb-small.js
│   │   │       bench-urlencoded-fields-100pairs-small.js
│   │   │       bench-urlencoded-fields-900pairs-small-alt.js
│   │   │
│   │   ├───lib
│   │   │   │   index.js
│   │   │   │   utils.js
│   │   │   │
│   │   │   └───types
│   │   │           multipart.js
│   │   │           urlencoded.js
│   │   │
│   │   └───test
│   │           common.js
│   │           test-types-multipart-charsets.js
│   │           test-types-multipart-stream-pause.js
│   │           test-types-multipart.js
│   │           test-types-urlencoded.js
│   │           test.js
│   │
│   ├───bytes
│   │       History.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       Readme.md
│   │
│   ├───call-bind-apply-helpers
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   actualApply.d.ts
│   │   │   actualApply.js
│   │   │   applyBind.d.ts
│   │   │   applyBind.js
│   │   │   CHANGELOG.md
│   │   │   functionApply.d.ts
│   │   │   functionApply.js
│   │   │   functionCall.d.ts
│   │   │   functionCall.js
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   reflectApply.d.ts
│   │   │   reflectApply.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───call-bound
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───chalk
│   │   │   index.d.ts
│   │   │   license
│   │   │   package.json
│   │   │   readme.md
│   │   │
│   │   ├───node_modules
│   │   │   ├───has-flag
│   │   │   │       index.d.ts
│   │   │   │       index.js
│   │   │   │       license
│   │   │   │       package.json
│   │   │   │       readme.md
│   │   │   │
│   │   │   └───supports-color
│   │   │           browser.js
│   │   │           index.js
│   │   │           license
│   │   │           package.json
│   │   │           readme.md
│   │   │
│   │   └───source
│   │           index.js
│   │           templates.js
│   │           util.js
│   │
│   ├───chokidar
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │       constants.js
│   │   │       fsevents-handler.js
│   │   │       nodefs-handler.js
│   │   │
│   │   └───types
│   │           index.d.ts
│   │
│   ├───chownr
│   │       chownr.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───cloudinary
│   │   │   babel.config.js
│   │   │   CHANGELOG.md
│   │   │   cloudinary.js
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │   │   api.js
│   │   │   │   auth_token.js
│   │   │   │   cache.js
│   │   │   │   cloudinary.js
│   │   │   │   config.js
│   │   │   │   preloaded_file.js
│   │   │   │   uploader.js
│   │   │   │   upload_stream.js
│   │   │   │
│   │   │   ├───analysis
│   │   │   │       index.js
│   │   │   │
│   │   │   ├───api_client
│   │   │   │       call_account_api.js
│   │   │   │       call_analysis_api.js
│   │   │   │       call_api.js
│   │   │   │       execute_request.js
│   │   │   │
│   │   │   ├───cache
│   │   │   │       FileKeyValueStorage.js
│   │   │   │       KeyValueCacheAdapter.js
│   │   │   │
│   │   │   ├───provisioning
│   │   │   │       account.js
│   │   │   │
│   │   │   ├───utils
│   │   │   │   │   consts.js
│   │   │   │   │   crc32.js
│   │   │   │   │   ensureOption.js
│   │   │   │   │   ensurePresenceOf.js
│   │   │   │   │   entries.js
│   │   │   │   │   generateBreakpoints.js
│   │   │   │   │   index.js
│   │   │   │   │   isRemoteUrl.js
│   │   │   │   │   rimraf.js
│   │   │   │   │   srcsetUtils.js
│   │   │   │   │   utf8_encode.js
│   │   │   │   │
│   │   │   │   ├───analytics
│   │   │   │   │       encodeVersion.js
│   │   │   │   │       getSDKVersions.js
│   │   │   │   │       index.js
│   │   │   │   │       removePatchFromSemver.js
│   │   │   │   │       reverseVersion.js
│   │   │   │   │       stringPad.js
│   │   │   │   │
│   │   │   │   ├───encoding
│   │   │   │   │       base64Encode.js
│   │   │   │   │       base64EncodeURL.js
│   │   │   │   │       base64Map.js
│   │   │   │   │       encodeDoubleArray.js
│   │   │   │   │       smart_escape.js
│   │   │   │   │
│   │   │   │   └───parsing
│   │   │   │           consumeOption.js
│   │   │   │           toArray.js
│   │   │   │
│   │   │   └───v2
│   │   │           api.js
│   │   │           index.js
│   │   │           search.js
│   │   │           search_folders.js
│   │   │           uploader.js
│   │   │
│   │   └───types
│   │           index.d.ts
│   │
│   ├───color-convert
│   │       CHANGELOG.md
│   │       conversions.js
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       route.js
│   │
│   ├───color-name
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───color-support
│   │       bin.js
│   │       browser.js
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───concat-map
│   │   │   .travis.yml
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.markdown
│   │   │
│   │   ├───example
│   │   │       map.js
│   │   │
│   │   └───test
│   │           map.js
│   │
│   ├───concat-stream
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   readme.md
│   │   │
│   │   └───node_modules
│   │       ├───readable-stream
│   │       │   │   .travis.yml
│   │       │   │   CONTRIBUTING.md
│   │       │   │   duplex-browser.js
│   │       │   │   duplex.js
│   │       │   │   GOVERNANCE.md
│   │       │   │   LICENSE
│   │       │   │   package.json
│   │       │   │   passthrough.js
│   │       │   │   readable-browser.js
│   │       │   │   readable.js
│   │       │   │   README.md
│   │       │   │   transform.js
│   │       │   │   writable-browser.js
│   │       │   │   writable.js
│   │       │   │
│   │       │   ├───doc
│   │       │   │   └───wg-meetings
│   │       │   │           2015-01-30.md
│   │       │   │
│   │       │   └───lib
│   │       │       │   _stream_duplex.js
│   │       │       │   _stream_passthrough.js
│   │       │       │   _stream_readable.js
│   │       │       │   _stream_transform.js
│   │       │       │   _stream_writable.js
│   │       │       │
│   │       │       └───internal
│   │       │           └───streams
│   │       │                   BufferList.js
│   │       │                   destroy.js
│   │       │                   stream-browser.js
│   │       │                   stream.js
│   │       │
│   │       ├───safe-buffer
│   │       │       index.d.ts
│   │       │       index.js
│   │       │       LICENSE
│   │       │       package.json
│   │       │       README.md
│   │       │
│   │       └───string_decoder
│   │           │   .travis.yml
│   │           │   LICENSE
│   │           │   package.json
│   │           │   README.md
│   │           │
│   │           └───lib
│   │                   string_decoder.js
│   │
│   ├───connect-pg-simple
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       table.sql
│   │
│   ├───console-control-strings
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       README.md~
│   │
│   ├───content-disposition
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───content-type
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───cookie
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       SECURITY.md
│   │
│   ├───cookie-signature
│   │       History.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       Readme.md
│   │
│   ├───core-util-is
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           util.js
│   │
│   ├───debug
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───src
│   │           browser.js
│   │           common.js
│   │           index.js
│   │           node.js
│   │
│   ├───delegates
│   │   │   .npmignore
│   │   │   History.md
│   │   │   index.js
│   │   │   License
│   │   │   Makefile
│   │   │   package.json
│   │   │   Readme.md
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───depd
│   │   │   History.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   Readme.md
│   │   │
│   │   └───lib
│   │       └───browser
│   │               index.js
│   │
│   ├───detect-libc
│   │   │   index.d.ts
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           detect-libc.js
│   │           filesystem.js
│   │           process.js
│   │
│   ├───dotenv
│   │   │   CHANGELOG.md
│   │   │   config.d.ts
│   │   │   config.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README-es.md
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           cli-options.js
│   │           env-options.js
│   │           main.d.ts
│   │           main.js
│   │
│   ├───dunder-proto
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   get.d.ts
│   │   │   get.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   set.d.ts
│   │   │   set.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           get.js
│   │           index.js
│   │           set.js
│   │
│   ├───ee-first
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───ejs
│   │   │   ejs.js
│   │   │   ejs.min.js
│   │   │   jakefile.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   usage.txt
│   │   │
│   │   ├───bin
│   │   │       cli.js
│   │   │
│   │   └───lib
│   │           ejs.js
│   │           utils.js
│   │
│   ├───emoji-regex
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE-MIT.txt
│   │   │   package.json
│   │   │   README.md
│   │   │   text.js
│   │   │
│   │   └───es2015
│   │           index.js
│   │           text.js
│   │
│   ├───encodeurl
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───es-define-property
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───es-errors
│   │   │   .eslintrc
│   │   │   CHANGELOG.md
│   │   │   eval.d.ts
│   │   │   eval.js
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   range.d.ts
│   │   │   range.js
│   │   │   README.md
│   │   │   ref.d.ts
│   │   │   ref.js
│   │   │   syntax.d.ts
│   │   │   syntax.js
│   │   │   tsconfig.json
│   │   │   type.d.ts
│   │   │   type.js
│   │   │   uri.d.ts
│   │   │   uri.js
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───es-object-atoms
│   │   │   .eslintrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   isObject.d.ts
│   │   │   isObject.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   RequireObjectCoercible.d.ts
│   │   │   RequireObjectCoercible.js
│   │   │   ToObject.d.ts
│   │   │   ToObject.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───escape-html
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       Readme.md
│   │
│   ├───etag
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───express
│   │   │   History.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   Readme.md
│   │   │
│   │   └───lib
│   │           application.js
│   │           express.js
│   │           request.js
│   │           response.js
│   │           utils.js
│   │           view.js
│   │
│   ├───express-session
│   │   │   HISTORY.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───node_modules
│   │   │   ├───cookie-signature
│   │   │   │       History.md
│   │   │   │       index.js
│   │   │   │       package.json
│   │   │   │       Readme.md
│   │   │   │
│   │   │   ├───debug
│   │   │   │   │   .coveralls.yml
│   │   │   │   │   .eslintrc
│   │   │   │   │   .npmignore
│   │   │   │   │   .travis.yml
│   │   │   │   │   CHANGELOG.md
│   │   │   │   │   component.json
│   │   │   │   │   karma.conf.js
│   │   │   │   │   LICENSE
│   │   │   │   │   Makefile
│   │   │   │   │   node.js
│   │   │   │   │   package.json
│   │   │   │   │   README.md
│   │   │   │   │
│   │   │   │   └───src
│   │   │   │           browser.js
│   │   │   │           debug.js
│   │   │   │           index.js
│   │   │   │           inspector-log.js
│   │   │   │           node.js
│   │   │   │
│   │   │   └───ms
│   │   │           index.js
│   │   │           license.md
│   │   │           package.json
│   │   │           readme.md
│   │   │
│   │   └───session
│   │           cookie.js
│   │           memory.js
│   │           session.js
│   │           store.js
│   │
│   ├───filelist
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   jakefile.js
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───node_modules
│   │       ├───brace-expansion
│   │       │   │   index.js
│   │       │   │   LICENSE
│   │       │   │   package.json
│   │       │   │   README.md
│   │       │   │
│   │       │   └───.github
│   │       │           FUNDING.yml
│   │       │
│   │       └───minimatch
│   │           │   LICENSE
│   │           │   minimatch.js
│   │           │   package.json
│   │           │   README.md
│   │           │
│   │           └───lib
│   │                   path.js
│   │
│   ├───fill-range
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───finalhandler
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───forwarded
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───fresh
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───fs-minipass
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───node_modules
│   │       └───minipass
│   │               index.d.ts
│   │               index.js
│   │               LICENSE
│   │               package.json
│   │               README.md
│   │
│   ├───fs.realpath
│   │       index.js
│   │       LICENSE
│   │       old.js
│   │       package.json
│   │       README.md
│   │
│   ├───function-bind
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   implementation.js
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │       SECURITY.md
│   │   │
│   │   └───test
│   │           .eslintrc
│   │           index.js
│   │
│   ├───gauge
│   │       base-theme.js
│   │       CHANGELOG.md
│   │       error.js
│   │       has-color.js
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       plumbing.js
│   │       process.js
│   │       progress-bar.js
│   │       README.md
│   │       render-template.js
│   │       set-immediate.js
│   │       set-interval.js
│   │       spin.js
│   │       template-item.js
│   │       theme-set.js
│   │       themes.js
│   │       wide-truncate.js
│   │
│   ├───get-intrinsic
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           GetIntrinsic.js
│   │
│   ├───get-proto
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   Object.getPrototypeOf.d.ts
│   │   │   Object.getPrototypeOf.js
│   │   │   package.json
│   │   │   README.md
│   │   │   Reflect.getPrototypeOf.d.ts
│   │   │   Reflect.getPrototypeOf.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───glob
│   │       common.js
│   │       glob.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       sync.js
│   │
│   ├───glob-parent
│   │       CHANGELOG.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───gopd
│   │   │   .eslintrc
│   │   │   CHANGELOG.md
│   │   │   gOPD.d.ts
│   │   │   gOPD.js
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───has-flag
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───has-symbols
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   shams.d.ts
│   │   │   shams.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │       │   index.js
│   │       │   tests.js
│   │       │
│   │       └───shams
│   │               core-js.js
│   │               get-own-property-symbols.js
│   │
│   ├───has-unicode
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───hasown
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   └───.github
│   │           FUNDING.yml
│   │
│   ├───http-errors
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───https-proxy-agent
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───dist
│   │           agent.d.ts
│   │           agent.js
│   │           agent.js.map
│   │           index.d.ts
│   │           index.js
│   │           index.js.map
│   │           parse-proxy-response.d.ts
│   │           parse-proxy-response.js
│   │           parse-proxy-response.js.map
│   │
│   ├───iconv-lite
│   │   │   Changelog.md
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │       dependabot.yml
│   │   │
│   │   ├───.idea
│   │   │   │   iconv-lite.iml
│   │   │   │   modules.xml
│   │   │   │   vcs.xml
│   │   │   │
│   │   │   ├───codeStyles
│   │   │   │       codeStyleConfig.xml
│   │   │   │       Project.xml
│   │   │   │
│   │   │   └───inspectionProfiles
│   │   │           Project_Default.xml
│   │   │
│   │   ├───encodings
│   │   │   │   dbcs-codec.js
│   │   │   │   dbcs-data.js
│   │   │   │   index.js
│   │   │   │   internal.js
│   │   │   │   sbcs-codec.js
│   │   │   │   sbcs-data-generated.js
│   │   │   │   sbcs-data.js
│   │   │   │   utf16.js
│   │   │   │   utf32.js
│   │   │   │   utf7.js
│   │   │   │
│   │   │   └───tables
│   │   │           big5-added.json
│   │   │           cp936.json
│   │   │           cp949.json
│   │   │           cp950.json
│   │   │           eucjp.json
│   │   │           gb18030-ranges.json
│   │   │           gbk-added.json
│   │   │           shiftjis.json
│   │   │
│   │   └───lib
│   │           bom-handling.js
│   │           index.d.ts
│   │           index.js
│   │           streams.js
│   │
│   ├───ignore-by-default
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───inflight
│   │       inflight.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───inherits
│   │       inherits.js
│   │       inherits_browser.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───ipaddr.js
│   │   │   ipaddr.min.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           ipaddr.js
│   │           ipaddr.js.d.ts
│   │
│   ├───is-binary-path
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───is-extglob
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───is-fullwidth-code-point
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───is-glob
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───is-number
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───is-promise
│   │       index.d.ts
│   │       index.js
│   │       index.mjs
│   │       LICENSE
│   │       package.json
│   │       readme.md
│   │
│   ├───isarray
│   │       .npmignore
│   │       .travis.yml
│   │       component.json
│   │       index.js
│   │       Makefile
│   │       package.json
│   │       README.md
│   │       test.js
│   │
│   ├───jake
│   │   │   jakefile.js
│   │   │   Makefile
│   │   │   package.json
│   │   │   README.md
│   │   │   usage.txt
│   │   │
│   │   ├───bin
│   │   │       bash_completion.sh
│   │   │       cli.js
│   │   │
│   │   ├───lib
│   │   │   │   api.js
│   │   │   │   jake.js
│   │   │   │   loader.js
│   │   │   │   namespace.js
│   │   │   │   package_task.js
│   │   │   │   parseargs.js
│   │   │   │   program.js
│   │   │   │   publish_task.js
│   │   │   │   rule.js
│   │   │   │   test_task.js
│   │   │   │
│   │   │   ├───task
│   │   │   │       directory_task.js
│   │   │   │       file_task.js
│   │   │   │       index.js
│   │   │   │       task.js
│   │   │   │
│   │   │   └───utils
│   │   │           file.js
│   │   │           index.js
│   │   │           logger.js
│   │   │
│   │   └───test
│   │       ├───integration
│   │       │   │   concurrent.js
│   │       │   │   file.js
│   │       │   │   file_task.js
│   │       │   │   helpers.js
│   │       │   │   jakefile.js
│   │       │   │   list_tasks.js
│   │       │   │   publish_task.js
│   │       │   │   rule.js
│   │       │   │   selfdep.js
│   │       │   │   task_base.js
│   │       │   │
│   │       │   └───jakelib
│   │       │           concurrent.jake.js
│   │       │           publish.jake.js
│   │       │           required_module.jake.js
│   │       │           rule.jake.js
│   │       │
│   │       └───unit
│   │               jakefile.js
│   │               namespace.js
│   │               parseargs.js
│   │
│   ├───lodash
│   │   │   add.js
│   │   │   after.js
│   │   │   array.js
│   │   │   ary.js
│   │   │   assign.js
│   │   │   assignIn.js
│   │   │   assignInWith.js
│   │   │   assignWith.js
│   │   │   at.js
│   │   │   attempt.js
│   │   │   before.js
│   │   │   bind.js
│   │   │   bindAll.js
│   │   │   bindKey.js
│   │   │   camelCase.js
│   │   │   capitalize.js
│   │   │   castArray.js
│   │   │   ceil.js
│   │   │   chain.js
│   │   │   chunk.js
│   │   │   clamp.js
│   │   │   clone.js
│   │   │   cloneDeep.js
│   │   │   cloneDeepWith.js
│   │   │   cloneWith.js
│   │   │   collection.js
│   │   │   commit.js
│   │   │   compact.js
│   │   │   concat.js
│   │   │   cond.js
│   │   │   conforms.js
│   │   │   conformsTo.js
│   │   │   constant.js
│   │   │   core.js
│   │   │   core.min.js
│   │   │   countBy.js
│   │   │   create.js
│   │   │   curry.js
│   │   │   curryRight.js
│   │   │   date.js
│   │   │   debounce.js
│   │   │   deburr.js
│   │   │   defaults.js
│   │   │   defaultsDeep.js
│   │   │   defaultTo.js
│   │   │   defer.js
│   │   │   delay.js
│   │   │   difference.js
│   │   │   differenceBy.js
│   │   │   differenceWith.js
│   │   │   divide.js
│   │   │   drop.js
│   │   │   dropRight.js
│   │   │   dropRightWhile.js
│   │   │   dropWhile.js
│   │   │   each.js
│   │   │   eachRight.js
│   │   │   endsWith.js
│   │   │   entries.js
│   │   │   entriesIn.js
│   │   │   eq.js
│   │   │   escape.js
│   │   │   escapeRegExp.js
│   │   │   every.js
│   │   │   extend.js
│   │   │   extendWith.js
│   │   │   fill.js
│   │   │   filter.js
│   │   │   find.js
│   │   │   findIndex.js
│   │   │   findKey.js
│   │   │   findLast.js
│   │   │   findLastIndex.js
│   │   │   findLastKey.js
│   │   │   first.js
│   │   │   flake.lock
│   │   │   flake.nix
│   │   │   flatMap.js
│   │   │   flatMapDeep.js
│   │   │   flatMapDepth.js
│   │   │   flatten.js
│   │   │   flattenDeep.js
│   │   │   flattenDepth.js
│   │   │   flip.js
│   │   │   floor.js
│   │   │   flow.js
│   │   │   flowRight.js
│   │   │   forEach.js
│   │   │   forEachRight.js
│   │   │   forIn.js
│   │   │   forInRight.js
│   │   │   forOwn.js
│   │   │   forOwnRight.js
│   │   │   fp.js
│   │   │   fromPairs.js
│   │   │   function.js
│   │   │   functions.js
│   │   │   functionsIn.js
│   │   │   get.js
│   │   │   groupBy.js
│   │   │   gt.js
│   │   │   gte.js
│   │   │   has.js
│   │   │   hasIn.js
│   │   │   head.js
│   │   │   identity.js
│   │   │   includes.js
│   │   │   index.js
│   │   │   indexOf.js
│   │   │   initial.js
│   │   │   inRange.js
│   │   │   intersection.js
│   │   │   intersectionBy.js
│   │   │   intersectionWith.js
│   │   │   invert.js
│   │   │   invertBy.js
│   │   │   invoke.js
│   │   │   invokeMap.js
│   │   │   isArguments.js
│   │   │   isArray.js
│   │   │   isArrayBuffer.js
│   │   │   isArrayLike.js
│   │   │   isArrayLikeObject.js
│   │   │   isBoolean.js
│   │   │   isBuffer.js
│   │   │   isDate.js
│   │   │   isElement.js
│   │   │   isEmpty.js
│   │   │   isEqual.js
│   │   │   isEqualWith.js
│   │   │   isError.js
│   │   │   isFinite.js
│   │   │   isFunction.js
│   │   │   isInteger.js
│   │   │   isLength.js
│   │   │   isMap.js
│   │   │   isMatch.js
│   │   │   isMatchWith.js
│   │   │   isNaN.js
│   │   │   isNative.js
│   │   │   isNil.js
│   │   │   isNull.js
│   │   │   isNumber.js
│   │   │   isObject.js
│   │   │   isObjectLike.js
│   │   │   isPlainObject.js
│   │   │   isRegExp.js
│   │   │   isSafeInteger.js
│   │   │   isSet.js
│   │   │   isString.js
│   │   │   isSymbol.js
│   │   │   isTypedArray.js
│   │   │   isUndefined.js
│   │   │   isWeakMap.js
│   │   │   isWeakSet.js
│   │   │   iteratee.js
│   │   │   join.js
│   │   │   kebabCase.js
│   │   │   keyBy.js
│   │   │   keys.js
│   │   │   keysIn.js
│   │   │   lang.js
│   │   │   last.js
│   │   │   lastIndexOf.js
│   │   │   LICENSE
│   │   │   lodash.js
│   │   │   lodash.min.js
│   │   │   lowerCase.js
│   │   │   lowerFirst.js
│   │   │   lt.js
│   │   │   lte.js
│   │   │   map.js
│   │   │   mapKeys.js
│   │   │   mapValues.js
│   │   │   matches.js
│   │   │   matchesProperty.js
│   │   │   math.js
│   │   │   max.js
│   │   │   maxBy.js
│   │   │   mean.js
│   │   │   meanBy.js
│   │   │   memoize.js
│   │   │   merge.js
│   │   │   mergeWith.js
│   │   │   method.js
│   │   │   methodOf.js
│   │   │   min.js
│   │   │   minBy.js
│   │   │   mixin.js
│   │   │   multiply.js
│   │   │   negate.js
│   │   │   next.js
│   │   │   noop.js
│   │   │   now.js
│   │   │   nth.js
│   │   │   nthArg.js
│   │   │   number.js
│   │   │   object.js
│   │   │   omit.js
│   │   │   omitBy.js
│   │   │   once.js
│   │   │   orderBy.js
│   │   │   over.js
│   │   │   overArgs.js
│   │   │   overEvery.js
│   │   │   overSome.js
│   │   │   package.json
│   │   │   pad.js
│   │   │   padEnd.js
│   │   │   padStart.js
│   │   │   parseInt.js
│   │   │   partial.js
│   │   │   partialRight.js
│   │   │   partition.js
│   │   │   pick.js
│   │   │   pickBy.js
│   │   │   plant.js
│   │   │   property.js
│   │   │   propertyOf.js
│   │   │   pull.js
│   │   │   pullAll.js
│   │   │   pullAllBy.js
│   │   │   pullAllWith.js
│   │   │   pullAt.js
│   │   │   random.js
│   │   │   range.js
│   │   │   rangeRight.js
│   │   │   README.md
│   │   │   rearg.js
│   │   │   reduce.js
│   │   │   reduceRight.js
│   │   │   reject.js
│   │   │   release.md
│   │   │   remove.js
│   │   │   repeat.js
│   │   │   replace.js
│   │   │   rest.js
│   │   │   result.js
│   │   │   reverse.js
│   │   │   round.js
│   │   │   sample.js
│   │   │   sampleSize.js
│   │   │   seq.js
│   │   │   set.js
│   │   │   setWith.js
│   │   │   shuffle.js
│   │   │   size.js
│   │   │   slice.js
│   │   │   snakeCase.js
│   │   │   some.js
│   │   │   sortBy.js
│   │   │   sortedIndex.js
│   │   │   sortedIndexBy.js
│   │   │   sortedIndexOf.js
│   │   │   sortedLastIndex.js
│   │   │   sortedLastIndexBy.js
│   │   │   sortedLastIndexOf.js
│   │   │   sortedUniq.js
│   │   │   sortedUniqBy.js
│   │   │   split.js
│   │   │   spread.js
│   │   │   startCase.js
│   │   │   startsWith.js
│   │   │   string.js
│   │   │   stubArray.js
│   │   │   stubFalse.js
│   │   │   stubObject.js
│   │   │   stubString.js
│   │   │   stubTrue.js
│   │   │   subtract.js
│   │   │   sum.js
│   │   │   sumBy.js
│   │   │   tail.js
│   │   │   take.js
│   │   │   takeRight.js
│   │   │   takeRightWhile.js
│   │   │   takeWhile.js
│   │   │   tap.js
│   │   │   template.js
│   │   │   templateSettings.js
│   │   │   throttle.js
│   │   │   thru.js
│   │   │   times.js
│   │   │   toArray.js
│   │   │   toFinite.js
│   │   │   toInteger.js
│   │   │   toIterator.js
│   │   │   toJSON.js
│   │   │   toLength.js
│   │   │   toLower.js
│   │   │   toNumber.js
│   │   │   toPairs.js
│   │   │   toPairsIn.js
│   │   │   toPath.js
│   │   │   toPlainObject.js
│   │   │   toSafeInteger.js
│   │   │   toString.js
│   │   │   toUpper.js
│   │   │   transform.js
│   │   │   trim.js
│   │   │   trimEnd.js
│   │   │   trimStart.js
│   │   │   truncate.js
│   │   │   unary.js
│   │   │   unescape.js
│   │   │   union.js
│   │   │   unionBy.js
│   │   │   unionWith.js
│   │   │   uniq.js
│   │   │   uniqBy.js
│   │   │   uniqueId.js
│   │   │   uniqWith.js
│   │   │   unset.js
│   │   │   unzip.js
│   │   │   unzipWith.js
│   │   │   update.js
│   │   │   updateWith.js
│   │   │   upperCase.js
│   │   │   upperFirst.js
│   │   │   util.js
│   │   │   value.js
│   │   │   valueOf.js
│   │   │   values.js
│   │   │   valuesIn.js
│   │   │   without.js
│   │   │   words.js
│   │   │   wrap.js
│   │   │   wrapperAt.js
│   │   │   wrapperChain.js
│   │   │   wrapperLodash.js
│   │   │   wrapperReverse.js
│   │   │   wrapperValue.js
│   │   │   xor.js
│   │   │   xorBy.js
│   │   │   xorWith.js
│   │   │   zip.js
│   │   │   zipObject.js
│   │   │   zipObjectDeep.js
│   │   │   zipWith.js
│   │   │   _apply.js
│   │   │   _arrayAggregator.js
│   │   │   _arrayEach.js
│   │   │   _arrayEachRight.js
│   │   │   _arrayEvery.js
│   │   │   _arrayFilter.js
│   │   │   _arrayIncludes.js
│   │   │   _arrayIncludesWith.js
│   │   │   _arrayLikeKeys.js
│   │   │   _arrayMap.js
│   │   │   _arrayPush.js
│   │   │   _arrayReduce.js
│   │   │   _arrayReduceRight.js
│   │   │   _arraySample.js
│   │   │   _arraySampleSize.js
│   │   │   _arrayShuffle.js
│   │   │   _arraySome.js
│   │   │   _asciiSize.js
│   │   │   _asciiToArray.js
│   │   │   _asciiWords.js
│   │   │   _assignMergeValue.js
│   │   │   _assignValue.js
│   │   │   _assocIndexOf.js
│   │   │   _baseAggregator.js
│   │   │   _baseAssign.js
│   │   │   _baseAssignIn.js
│   │   │   _baseAssignValue.js
│   │   │   _baseAt.js
│   │   │   _baseClamp.js
│   │   │   _baseClone.js
│   │   │   _baseConforms.js
│   │   │   _baseConformsTo.js
│   │   │   _baseCreate.js
│   │   │   _baseDelay.js
│   │   │   _baseDifference.js
│   │   │   _baseEach.js
│   │   │   _baseEachRight.js
│   │   │   _baseEvery.js
│   │   │   _baseExtremum.js
│   │   │   _baseFill.js
│   │   │   _baseFilter.js
│   │   │   _baseFindIndex.js
│   │   │   _baseFindKey.js
│   │   │   _baseFlatten.js
│   │   │   _baseFor.js
│   │   │   _baseForOwn.js
│   │   │   _baseForOwnRight.js
│   │   │   _baseForRight.js
│   │   │   _baseFunctions.js
│   │   │   _baseGet.js
│   │   │   _baseGetAllKeys.js
│   │   │   _baseGetTag.js
│   │   │   _baseGt.js
│   │   │   _baseHas.js
│   │   │   _baseHasIn.js
│   │   │   _baseIndexOf.js
│   │   │   _baseIndexOfWith.js
│   │   │   _baseInRange.js
│   │   │   _baseIntersection.js
│   │   │   _baseInverter.js
│   │   │   _baseInvoke.js
│   │   │   _baseIsArguments.js
│   │   │   _baseIsArrayBuffer.js
│   │   │   _baseIsDate.js
│   │   │   _baseIsEqual.js
│   │   │   _baseIsEqualDeep.js
│   │   │   _baseIsMap.js
│   │   │   _baseIsMatch.js
│   │   │   _baseIsNaN.js
│   │   │   _baseIsNative.js
│   │   │   _baseIsRegExp.js
│   │   │   _baseIsSet.js
│   │   │   _baseIsTypedArray.js
│   │   │   _baseIteratee.js
│   │   │   _baseKeys.js
│   │   │   _baseKeysIn.js
│   │   │   _baseLodash.js
│   │   │   _baseLt.js
│   │   │   _baseMap.js
│   │   │   _baseMatches.js
│   │   │   _baseMatchesProperty.js
│   │   │   _baseMean.js
│   │   │   _baseMerge.js
│   │   │   _baseMergeDeep.js
│   │   │   _baseNth.js
│   │   │   _baseOrderBy.js
│   │   │   _basePick.js
│   │   │   _basePickBy.js
│   │   │   _baseProperty.js
│   │   │   _basePropertyDeep.js
│   │   │   _basePropertyOf.js
│   │   │   _basePullAll.js
│   │   │   _basePullAt.js
│   │   │   _baseRandom.js
│   │   │   _baseRange.js
│   │   │   _baseReduce.js
│   │   │   _baseRepeat.js
│   │   │   _baseRest.js
│   │   │   _baseSample.js
│   │   │   _baseSampleSize.js
│   │   │   _baseSet.js
│   │   │   _baseSetData.js
│   │   │   _baseSetToString.js
│   │   │   _baseShuffle.js
│   │   │   _baseSlice.js
│   │   │   _baseSome.js
│   │   │   _baseSortBy.js
│   │   │   _baseSortedIndex.js
│   │   │   _baseSortedIndexBy.js
│   │   │   _baseSortedUniq.js
│   │   │   _baseSum.js
│   │   │   _baseTimes.js
│   │   │   _baseToNumber.js
│   │   │   _baseToPairs.js
│   │   │   _baseToString.js
│   │   │   _baseTrim.js
│   │   │   _baseUnary.js
│   │   │   _baseUniq.js
│   │   │   _baseUnset.js
│   │   │   _baseUpdate.js
│   │   │   _baseValues.js
│   │   │   _baseWhile.js
│   │   │   _baseWrapperValue.js
│   │   │   _baseXor.js
│   │   │   _baseZipObject.js
│   │   │   _cacheHas.js
│   │   │   _castArrayLikeObject.js
│   │   │   _castFunction.js
│   │   │   _castPath.js
│   │   │   _castRest.js
│   │   │   _castSlice.js
│   │   │   _charsEndIndex.js
│   │   │   _charsStartIndex.js
│   │   │   _cloneArrayBuffer.js
│   │   │   _cloneBuffer.js
│   │   │   _cloneDataView.js
│   │   │   _cloneRegExp.js
│   │   │   _cloneSymbol.js
│   │   │   _cloneTypedArray.js
│   │   │   _compareAscending.js
│   │   │   _compareMultiple.js
│   │   │   _composeArgs.js
│   │   │   _composeArgsRight.js
│   │   │   _copyArray.js
│   │   │   _copyObject.js
│   │   │   _copySymbols.js
│   │   │   _copySymbolsIn.js
│   │   │   _coreJsData.js
│   │   │   _countHolders.js
│   │   │   _createAggregator.js
│   │   │   _createAssigner.js
│   │   │   _createBaseEach.js
│   │   │   _createBaseFor.js
│   │   │   _createBind.js
│   │   │   _createCaseFirst.js
│   │   │   _createCompounder.js
│   │   │   _createCtor.js
│   │   │   _createCurry.js
│   │   │   _createFind.js
│   │   │   _createFlow.js
│   │   │   _createHybrid.js
│   │   │   _createInverter.js
│   │   │   _createMathOperation.js
│   │   │   _createOver.js
│   │   │   _createPadding.js
│   │   │   _createPartial.js
│   │   │   _createRange.js
│   │   │   _createRecurry.js
│   │   │   _createRelationalOperation.js
│   │   │   _createRound.js
│   │   │   _createSet.js
│   │   │   _createToPairs.js
│   │   │   _createWrap.js
│   │   │   _customDefaultsAssignIn.js
│   │   │   _customDefaultsMerge.js
│   │   │   _customOmitClone.js
│   │   │   _DataView.js
│   │   │   _deburrLetter.js
│   │   │   _defineProperty.js
│   │   │   _equalArrays.js
│   │   │   _equalByTag.js
│   │   │   _equalObjects.js
│   │   │   _escapeHtmlChar.js
│   │   │   _escapeStringChar.js
│   │   │   _flatRest.js
│   │   │   _freeGlobal.js
│   │   │   _getAllKeys.js
│   │   │   _getAllKeysIn.js
│   │   │   _getData.js
│   │   │   _getFuncName.js
│   │   │   _getHolder.js
│   │   │   _getMapData.js
│   │   │   _getMatchData.js
│   │   │   _getNative.js
│   │   │   _getPrototype.js
│   │   │   _getRawTag.js
│   │   │   _getSymbols.js
│   │   │   _getSymbolsIn.js
│   │   │   _getTag.js
│   │   │   _getValue.js
│   │   │   _getView.js
│   │   │   _getWrapDetails.js
│   │   │   _Hash.js
│   │   │   _hashClear.js
│   │   │   _hashDelete.js
│   │   │   _hashGet.js
│   │   │   _hashHas.js
│   │   │   _hashSet.js
│   │   │   _hasPath.js
│   │   │   _hasUnicode.js
│   │   │   _hasUnicodeWord.js
│   │   │   _initCloneArray.js
│   │   │   _initCloneByTag.js
│   │   │   _initCloneObject.js
│   │   │   _insertWrapDetails.js
│   │   │   _isFlattenable.js
│   │   │   _isIndex.js
│   │   │   _isIterateeCall.js
│   │   │   _isKey.js
│   │   │   _isKeyable.js
│   │   │   _isLaziable.js
│   │   │   _isMaskable.js
│   │   │   _isMasked.js
│   │   │   _isPrototype.js
│   │   │   _isStrictComparable.js
│   │   │   _iteratorToArray.js
│   │   │   _lazyClone.js
│   │   │   _lazyReverse.js
│   │   │   _lazyValue.js
│   │   │   _LazyWrapper.js
│   │   │   _ListCache.js
│   │   │   _listCacheClear.js
│   │   │   _listCacheDelete.js
│   │   │   _listCacheGet.js
│   │   │   _listCacheHas.js
│   │   │   _listCacheSet.js
│   │   │   _LodashWrapper.js
│   │   │   _Map.js
│   │   │   _MapCache.js
│   │   │   _mapCacheClear.js
│   │   │   _mapCacheDelete.js
│   │   │   _mapCacheGet.js
│   │   │   _mapCacheHas.js
│   │   │   _mapCacheSet.js
│   │   │   _mapToArray.js
│   │   │   _matchesStrictComparable.js
│   │   │   _memoizeCapped.js
│   │   │   _mergeData.js
│   │   │   _metaMap.js
│   │   │   _nativeCreate.js
│   │   │   _nativeKeys.js
│   │   │   _nativeKeysIn.js
│   │   │   _nodeUtil.js
│   │   │   _objectToString.js
│   │   │   _overArg.js
│   │   │   _overRest.js
│   │   │   _parent.js
│   │   │   _Promise.js
│   │   │   _realNames.js
│   │   │   _reEscape.js
│   │   │   _reEvaluate.js
│   │   │   _reInterpolate.js
│   │   │   _reorder.js
│   │   │   _replaceHolders.js
│   │   │   _root.js
│   │   │   _safeGet.js
│   │   │   _Set.js
│   │   │   _SetCache.js
│   │   │   _setCacheAdd.js
│   │   │   _setCacheHas.js
│   │   │   _setData.js
│   │   │   _setToArray.js
│   │   │   _setToPairs.js
│   │   │   _setToString.js
│   │   │   _setWrapToString.js
│   │   │   _shortOut.js
│   │   │   _shuffleSelf.js
│   │   │   _Stack.js
│   │   │   _stackClear.js
│   │   │   _stackDelete.js
│   │   │   _stackGet.js
│   │   │   _stackHas.js
│   │   │   _stackSet.js
│   │   │   _strictIndexOf.js
│   │   │   _strictLastIndexOf.js
│   │   │   _stringSize.js
│   │   │   _stringToArray.js
│   │   │   _stringToPath.js
│   │   │   _Symbol.js
│   │   │   _toKey.js
│   │   │   _toSource.js
│   │   │   _trimmedEndIndex.js
│   │   │   _Uint8Array.js
│   │   │   _unescapeHtmlChar.js
│   │   │   _unicodeSize.js
│   │   │   _unicodeToArray.js
│   │   │   _unicodeWords.js
│   │   │   _updateWrapDetails.js
│   │   │   _WeakMap.js
│   │   │   _wrapperClone.js
│   │   │
│   │   └───fp
│   │           add.js
│   │           after.js
│   │           all.js
│   │           allPass.js
│   │           always.js
│   │           any.js
│   │           anyPass.js
│   │           apply.js
│   │           array.js
│   │           ary.js
│   │           assign.js
│   │           assignAll.js
│   │           assignAllWith.js
│   │           assignIn.js
│   │           assignInAll.js
│   │           assignInAllWith.js
│   │           assignInWith.js
│   │           assignWith.js
│   │           assoc.js
│   │           assocPath.js
│   │           at.js
│   │           attempt.js
│   │           before.js
│   │           bind.js
│   │           bindAll.js
│   │           bindKey.js
│   │           camelCase.js
│   │           capitalize.js
│   │           castArray.js
│   │           ceil.js
│   │           chain.js
│   │           chunk.js
│   │           clamp.js
│   │           clone.js
│   │           cloneDeep.js
│   │           cloneDeepWith.js
│   │           cloneWith.js
│   │           collection.js
│   │           commit.js
│   │           compact.js
│   │           complement.js
│   │           compose.js
│   │           concat.js
│   │           cond.js
│   │           conforms.js
│   │           conformsTo.js
│   │           constant.js
│   │           contains.js
│   │           convert.js
│   │           countBy.js
│   │           create.js
│   │           curry.js
│   │           curryN.js
│   │           curryRight.js
│   │           curryRightN.js
│   │           date.js
│   │           debounce.js
│   │           deburr.js
│   │           defaults.js
│   │           defaultsAll.js
│   │           defaultsDeep.js
│   │           defaultsDeepAll.js
│   │           defaultTo.js
│   │           defer.js
│   │           delay.js
│   │           difference.js
│   │           differenceBy.js
│   │           differenceWith.js
│   │           dissoc.js
│   │           dissocPath.js
│   │           divide.js
│   │           drop.js
│   │           dropLast.js
│   │           dropLastWhile.js
│   │           dropRight.js
│   │           dropRightWhile.js
│   │           dropWhile.js
│   │           each.js
│   │           eachRight.js
│   │           endsWith.js
│   │           entries.js
│   │           entriesIn.js
│   │           eq.js
│   │           equals.js
│   │           escape.js
│   │           escapeRegExp.js
│   │           every.js
│   │           extend.js
│   │           extendAll.js
│   │           extendAllWith.js
│   │           extendWith.js
│   │           F.js
│   │           fill.js
│   │           filter.js
│   │           find.js
│   │           findFrom.js
│   │           findIndex.js
│   │           findIndexFrom.js
│   │           findKey.js
│   │           findLast.js
│   │           findLastFrom.js
│   │           findLastIndex.js
│   │           findLastIndexFrom.js
│   │           findLastKey.js
│   │           first.js
│   │           flatMap.js
│   │           flatMapDeep.js
│   │           flatMapDepth.js
│   │           flatten.js
│   │           flattenDeep.js
│   │           flattenDepth.js
│   │           flip.js
│   │           floor.js
│   │           flow.js
│   │           flowRight.js
│   │           forEach.js
│   │           forEachRight.js
│   │           forIn.js
│   │           forInRight.js
│   │           forOwn.js
│   │           forOwnRight.js
│   │           fromPairs.js
│   │           function.js
│   │           functions.js
│   │           functionsIn.js
│   │           get.js
│   │           getOr.js
│   │           groupBy.js
│   │           gt.js
│   │           gte.js
│   │           has.js
│   │           hasIn.js
│   │           head.js
│   │           identical.js
│   │           identity.js
│   │           includes.js
│   │           includesFrom.js
│   │           indexBy.js
│   │           indexOf.js
│   │           indexOfFrom.js
│   │           init.js
│   │           initial.js
│   │           inRange.js
│   │           intersection.js
│   │           intersectionBy.js
│   │           intersectionWith.js
│   │           invert.js
│   │           invertBy.js
│   │           invertObj.js
│   │           invoke.js
│   │           invokeArgs.js
│   │           invokeArgsMap.js
│   │           invokeMap.js
│   │           isArguments.js
│   │           isArray.js
│   │           isArrayBuffer.js
│   │           isArrayLike.js
│   │           isArrayLikeObject.js
│   │           isBoolean.js
│   │           isBuffer.js
│   │           isDate.js
│   │           isElement.js
│   │           isEmpty.js
│   │           isEqual.js
│   │           isEqualWith.js
│   │           isError.js
│   │           isFinite.js
│   │           isFunction.js
│   │           isInteger.js
│   │           isLength.js
│   │           isMap.js
│   │           isMatch.js
│   │           isMatchWith.js
│   │           isNaN.js
│   │           isNative.js
│   │           isNil.js
│   │           isNull.js
│   │           isNumber.js
│   │           isObject.js
│   │           isObjectLike.js
│   │           isPlainObject.js
│   │           isRegExp.js
│   │           isSafeInteger.js
│   │           isSet.js
│   │           isString.js
│   │           isSymbol.js
│   │           isTypedArray.js
│   │           isUndefined.js
│   │           isWeakMap.js
│   │           isWeakSet.js
│   │           iteratee.js
│   │           join.js
│   │           juxt.js
│   │           kebabCase.js
│   │           keyBy.js
│   │           keys.js
│   │           keysIn.js
│   │           lang.js
│   │           last.js
│   │           lastIndexOf.js
│   │           lastIndexOfFrom.js
│   │           lowerCase.js
│   │           lowerFirst.js
│   │           lt.js
│   │           lte.js
│   │           map.js
│   │           mapKeys.js
│   │           mapValues.js
│   │           matches.js
│   │           matchesProperty.js
│   │           math.js
│   │           max.js
│   │           maxBy.js
│   │           mean.js
│   │           meanBy.js
│   │           memoize.js
│   │           merge.js
│   │           mergeAll.js
│   │           mergeAllWith.js
│   │           mergeWith.js
│   │           method.js
│   │           methodOf.js
│   │           min.js
│   │           minBy.js
│   │           mixin.js
│   │           multiply.js
│   │           nAry.js
│   │           negate.js
│   │           next.js
│   │           noop.js
│   │           now.js
│   │           nth.js
│   │           nthArg.js
│   │           number.js
│   │           object.js
│   │           omit.js
│   │           omitAll.js
│   │           omitBy.js
│   │           once.js
│   │           orderBy.js
│   │           over.js
│   │           overArgs.js
│   │           overEvery.js
│   │           overSome.js
│   │           pad.js
│   │           padChars.js
│   │           padCharsEnd.js
│   │           padCharsStart.js
│   │           padEnd.js
│   │           padStart.js
│   │           parseInt.js
│   │           partial.js
│   │           partialRight.js
│   │           partition.js
│   │           path.js
│   │           pathEq.js
│   │           pathOr.js
│   │           paths.js
│   │           pick.js
│   │           pickAll.js
│   │           pickBy.js
│   │           pipe.js
│   │           placeholder.js
│   │           plant.js
│   │           pluck.js
│   │           prop.js
│   │           propEq.js
│   │           property.js
│   │           propertyOf.js
│   │           propOr.js
│   │           props.js
│   │           pull.js
│   │           pullAll.js
│   │           pullAllBy.js
│   │           pullAllWith.js
│   │           pullAt.js
│   │           random.js
│   │           range.js
│   │           rangeRight.js
│   │           rangeStep.js
│   │           rangeStepRight.js
│   │           rearg.js
│   │           reduce.js
│   │           reduceRight.js
│   │           reject.js
│   │           remove.js
│   │           repeat.js
│   │           replace.js
│   │           rest.js
│   │           restFrom.js
│   │           result.js
│   │           reverse.js
│   │           round.js
│   │           sample.js
│   │           sampleSize.js
│   │           seq.js
│   │           set.js
│   │           setWith.js
│   │           shuffle.js
│   │           size.js
│   │           slice.js
│   │           snakeCase.js
│   │           some.js
│   │           sortBy.js
│   │           sortedIndex.js
│   │           sortedIndexBy.js
│   │           sortedIndexOf.js
│   │           sortedLastIndex.js
│   │           sortedLastIndexBy.js
│   │           sortedLastIndexOf.js
│   │           sortedUniq.js
│   │           sortedUniqBy.js
│   │           split.js
│   │           spread.js
│   │           spreadFrom.js
│   │           startCase.js
│   │           startsWith.js
│   │           string.js
│   │           stubArray.js
│   │           stubFalse.js
│   │           stubObject.js
│   │           stubString.js
│   │           stubTrue.js
│   │           subtract.js
│   │           sum.js
│   │           sumBy.js
│   │           symmetricDifference.js
│   │           symmetricDifferenceBy.js
│   │           symmetricDifferenceWith.js
│   │           T.js
│   │           tail.js
│   │           take.js
│   │           takeLast.js
│   │           takeLastWhile.js
│   │           takeRight.js
│   │           takeRightWhile.js
│   │           takeWhile.js
│   │           tap.js
│   │           template.js
│   │           templateSettings.js
│   │           throttle.js
│   │           thru.js
│   │           times.js
│   │           toArray.js
│   │           toFinite.js
│   │           toInteger.js
│   │           toIterator.js
│   │           toJSON.js
│   │           toLength.js
│   │           toLower.js
│   │           toNumber.js
│   │           toPairs.js
│   │           toPairsIn.js
│   │           toPath.js
│   │           toPlainObject.js
│   │           toSafeInteger.js
│   │           toString.js
│   │           toUpper.js
│   │           transform.js
│   │           trim.js
│   │           trimChars.js
│   │           trimCharsEnd.js
│   │           trimCharsStart.js
│   │           trimEnd.js
│   │           trimStart.js
│   │           truncate.js
│   │           unapply.js
│   │           unary.js
│   │           unescape.js
│   │           union.js
│   │           unionBy.js
│   │           unionWith.js
│   │           uniq.js
│   │           uniqBy.js
│   │           uniqueId.js
│   │           uniqWith.js
│   │           unnest.js
│   │           unset.js
│   │           unzip.js
│   │           unzipWith.js
│   │           update.js
│   │           updateWith.js
│   │           upperCase.js
│   │           upperFirst.js
│   │           useWith.js
│   │           util.js
│   │           value.js
│   │           valueOf.js
│   │           values.js
│   │           valuesIn.js
│   │           where.js
│   │           whereEq.js
│   │           without.js
│   │           words.js
│   │           wrap.js
│   │           wrapperAt.js
│   │           wrapperChain.js
│   │           wrapperLodash.js
│   │           wrapperReverse.js
│   │           wrapperValue.js
│   │           xor.js
│   │           xorBy.js
│   │           xorWith.js
│   │           zip.js
│   │           zipAll.js
│   │           zipObj.js
│   │           zipObject.js
│   │           zipObjectDeep.js
│   │           zipWith.js
│   │           _baseConvert.js
│   │           _convertBrowser.js
│   │           _falseOptions.js
│   │           _mapping.js
│   │           _util.js
│   │           __.js
│   │
│   ├───make-dir
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   license
│   │   │   package.json
│   │   │   readme.md
│   │   │
│   │   └───node_modules
│   │       ├───.bin
│   │       │       semver
│   │       │       semver.cmd
│   │       │       semver.ps1
│   │       │
│   │       └───semver
│   │           │   LICENSE
│   │           │   package.json
│   │           │   range.bnf
│   │           │   README.md
│   │           │   semver.js
│   │           │
│   │           └───bin
│   │                   semver.js
│   │
│   ├───math-intrinsics
│   │   │   .eslintrc
│   │   │   abs.d.ts
│   │   │   abs.js
│   │   │   CHANGELOG.md
│   │   │   floor.d.ts
│   │   │   floor.js
│   │   │   isFinite.d.ts
│   │   │   isFinite.js
│   │   │   isInteger.d.ts
│   │   │   isInteger.js
│   │   │   isNaN.d.ts
│   │   │   isNaN.js
│   │   │   isNegativeZero.d.ts
│   │   │   isNegativeZero.js
│   │   │   LICENSE
│   │   │   max.d.ts
│   │   │   max.js
│   │   │   min.d.ts
│   │   │   min.js
│   │   │   mod.d.ts
│   │   │   mod.js
│   │   │   package.json
│   │   │   pow.d.ts
│   │   │   pow.js
│   │   │   README.md
│   │   │   round.d.ts
│   │   │   round.js
│   │   │   sign.d.ts
│   │   │   sign.js
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   ├───constants
│   │   │       maxArrayLength.d.ts
│   │   │       maxArrayLength.js
│   │   │       maxSafeInteger.d.ts
│   │   │       maxSafeInteger.js
│   │   │       maxValue.d.ts
│   │   │       maxValue.js
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───media-typer
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───merge-descriptors
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───mime-db
│   │       db.json
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───mime-types
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       mimeScore.js
│   │       package.json
│   │       README.md
│   │
│   ├───minimatch
│   │       LICENSE
│   │       minimatch.js
│   │       package.json
│   │       README.md
│   │
│   ├───minimist
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   ├───example
│   │   │       parse.js
│   │   │
│   │   └───test
│   │           all_bool.js
│   │           bool.js
│   │           dash.js
│   │           default_bool.js
│   │           dotted.js
│   │           kv_short.js
│   │           long.js
│   │           num.js
│   │           parse.js
│   │           parse_modified.js
│   │           proto.js
│   │           short.js
│   │           stop_early.js
│   │           unknown.js
│   │           whitespace.js
│   │
│   ├───minipass
│   │       index.d.ts
│   │       index.js
│   │       index.mjs
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───minizlib
│   │   │   constants.js
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───node_modules
│   │       └───minipass
│   │               index.d.ts
│   │               index.js
│   │               LICENSE
│   │               package.json
│   │               README.md
│   │
│   ├───mkdirp
│   │   │   CHANGELOG.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   readme.markdown
│   │   │
│   │   ├───bin
│   │   │       cmd.js
│   │   │
│   │   └───lib
│   │           find-made.js
│   │           mkdirp-manual.js
│   │           mkdirp-native.js
│   │           opts-arg.js
│   │           path-arg.js
│   │           use-native.js
│   │
│   ├───ms
│   │       index.js
│   │       license.md
│   │       package.json
│   │       readme.md
│   │
│   ├───multer
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │       counter.js
│   │   │       file-appender.js
│   │   │       make-middleware.js
│   │   │       multer-error.js
│   │   │       remove-uploaded-files.js
│   │   │
│   │   ├───node_modules
│   │   │   ├───.bin
│   │   │   │       mkdirp
│   │   │   │       mkdirp.cmd
│   │   │   │       mkdirp.ps1
│   │   │   │
│   │   │   ├───media-typer
│   │   │   │       HISTORY.md
│   │   │   │       index.js
│   │   │   │       LICENSE
│   │   │   │       package.json
│   │   │   │       README.md
│   │   │   │
│   │   │   ├───mime-db
│   │   │   │       db.json
│   │   │   │       HISTORY.md
│   │   │   │       index.js
│   │   │   │       LICENSE
│   │   │   │       package.json
│   │   │   │       README.md
│   │   │   │
│   │   │   ├───mime-types
│   │   │   │       HISTORY.md
│   │   │   │       index.js
│   │   │   │       LICENSE
│   │   │   │       package.json
│   │   │   │       README.md
│   │   │   │
│   │   │   ├───mkdirp
│   │   │   │   │   index.js
│   │   │   │   │   LICENSE
│   │   │   │   │   package.json
│   │   │   │   │   readme.markdown
│   │   │   │   │
│   │   │   │   └───bin
│   │   │   │           cmd.js
│   │   │   │           usage.txt
│   │   │   │
│   │   │   └───type-is
│   │   │           HISTORY.md
│   │   │           index.js
│   │   │           LICENSE
│   │   │           package.json
│   │   │           README.md
│   │   │
│   │   └───storage
│   │           disk.js
│   │           memory.js
│   │
│   ├───negotiator
│   │   │   HISTORY.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           charset.js
│   │           encoding.js
│   │           language.js
│   │           mediaType.js
│   │
│   ├───node-addon-api
│   │   │   common.gypi
│   │   │   except.gypi
│   │   │   index.js
│   │   │   LICENSE.md
│   │   │   napi-inl.deprecated.h
│   │   │   napi-inl.h
│   │   │   napi.h
│   │   │   node_api.gyp
│   │   │   noexcept.gypi
│   │   │   nothing.c
│   │   │   package-support.json
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───tools
│   │           check-napi.js
│   │           clang-format.js
│   │           conversion.js
│   │           eslint-format.js
│   │           README.md
│   │
│   ├───node-fetch
│   │   │   browser.js
│   │   │   LICENSE.md
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           index.es.js
│   │           index.js
│   │           index.mjs
│   │
│   ├───nodemailer
│   │   │   .gitattributes
│   │   │   .ncurc.js
│   │   │   .prettierrc.js
│   │   │   CHANGELOG.md
│   │   │   CODE_OF_CONDUCT.md
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   SECURITY.txt
│   │   │
│   │   └───lib
│   │       │   nodemailer.js
│   │       │
│   │       ├───addressparser
│   │       │       index.js
│   │       │
│   │       ├───base64
│   │       │       index.js
│   │       │
│   │       ├───dkim
│   │       │       index.js
│   │       │       message-parser.js
│   │       │       relaxed-body.js
│   │       │       sign.js
│   │       │
│   │       ├───fetch
│   │       │       cookies.js
│   │       │       index.js
│   │       │
│   │       ├───json-transport
│   │       │       index.js
│   │       │
│   │       ├───mail-composer
│   │       │       index.js
│   │       │
│   │       ├───mailer
│   │       │       index.js
│   │       │       mail-message.js
│   │       │
│   │       ├───mime-funcs
│   │       │       index.js
│   │       │       mime-types.js
│   │       │
│   │       ├───mime-node
│   │       │       index.js
│   │       │       last-newline.js
│   │       │       le-unix.js
│   │       │       le-windows.js
│   │       │
│   │       ├───punycode
│   │       │       index.js
│   │       │
│   │       ├───qp
│   │       │       index.js
│   │       │
│   │       ├───sendmail-transport
│   │       │       index.js
│   │       │
│   │       ├───ses-transport
│   │       │       index.js
│   │       │
│   │       ├───shared
│   │       │       index.js
│   │       │
│   │       ├───smtp-connection
│   │       │       data-stream.js
│   │       │       http-proxy-client.js
│   │       │       index.js
│   │       │
│   │       ├───smtp-pool
│   │       │       index.js
│   │       │       pool-resource.js
│   │       │
│   │       ├───smtp-transport
│   │       │       index.js
│   │       │
│   │       ├───stream-transport
│   │       │       index.js
│   │       │
│   │       ├───well-known
│   │       │       index.js
│   │       │       services.json
│   │       │
│   │       └───xoauth2
│   │               index.js
│   │
│   ├───nodemon
│   │   │   .prettierrc.json
│   │   │   index.d.ts
│   │   │   jsconfig.json
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───bin
│   │   │       nodemon.js
│   │   │       windows-kill.exe
│   │   │
│   │   ├───doc
│   │   │   └───cli
│   │   │           authors.txt
│   │   │           config.txt
│   │   │           help.txt
│   │   │           logo.txt
│   │   │           options.txt
│   │   │           topics.txt
│   │   │           usage.txt
│   │   │           whoami.txt
│   │   │
│   │   └───lib
│   │       │   index.js
│   │       │   nodemon.js
│   │       │   spawn.js
│   │       │   version.js
│   │       │
│   │       ├───cli
│   │       │       index.js
│   │       │       parse.js
│   │       │
│   │       ├───config
│   │       │       command.js
│   │       │       defaults.js
│   │       │       exec.js
│   │       │       index.js
│   │       │       load.js
│   │       │
│   │       ├───help
│   │       │       index.js
│   │       │
│   │       ├───monitor
│   │       │       index.js
│   │       │       match.js
│   │       │       run.js
│   │       │       signals.js
│   │       │       watch.js
│   │       │
│   │       ├───rules
│   │       │       add.js
│   │       │       index.js
│   │       │       parse.js
│   │       │
│   │       └───utils
│   │               bus.js
│   │               clone.js
│   │               colour.js
│   │               index.js
│   │               log.js
│   │               merge.js
│   │
│   ├───nopt
│   │   │   CHANGELOG.md
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───bin
│   │   │       nopt.js
│   │   │
│   │   └───lib
│   │           nopt.js
│   │
│   ├───normalize-path
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───npmlog
│   │       LICENSE
│   │       log.js
│   │       package.json
│   │       README.md
│   │
│   ├───object-assign
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───object-inspect
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package-support.json
│   │   │   package.json
│   │   │   readme.markdown
│   │   │   test-core-js.js
│   │   │   util.inspect.js
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   ├───example
│   │   │       all.js
│   │   │       circular.js
│   │   │       fn.js
│   │   │       inspect.js
│   │   │
│   │   └───test
│   │       │   bigint.js
│   │       │   circular.js
│   │       │   deep.js
│   │       │   element.js
│   │       │   err.js
│   │       │   fakes.js
│   │       │   fn.js
│   │       │   global.js
│   │       │   has.js
│   │       │   holes.js
│   │       │   indent-option.js
│   │       │   inspect.js
│   │       │   lowbyte.js
│   │       │   number.js
│   │       │   quoteStyle.js
│   │       │   toStringTag.js
│   │       │   undef.js
│   │       │   values.js
│   │       │
│   │       └───browser
│   │               dom.js
│   │
│   ├───on-finished
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───on-headers
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───once
│   │       LICENSE
│   │       once.js
│   │       package.json
│   │       README.md
│   │
│   ├───parseurl
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───path-is-absolute
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───path-to-regexp
│   │   │   LICENSE
│   │   │   package.json
│   │   │   Readme.md
│   │   │
│   │   └───dist
│   │           index.d.ts
│   │           index.js
│   │           index.js.map
│   │
│   ├───pg
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───esm
│   │   │       index.mjs
│   │   │
│   │   └───lib
│   │       │   client.js
│   │       │   connection-parameters.js
│   │       │   connection.js
│   │       │   defaults.js
│   │       │   index.js
│   │       │   query.js
│   │       │   result.js
│   │       │   stream.js
│   │       │   type-overrides.js
│   │       │   utils.js
│   │       │
│   │       ├───crypto
│   │       │       cert-signatures.js
│   │       │       sasl.js
│   │       │       utils-legacy.js
│   │       │       utils-webcrypto.js
│   │       │       utils.js
│   │       │
│   │       └───native
│   │               client.js
│   │               index.js
│   │               query.js
│   │
│   ├───pg-cloudflare
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───dist
│   │   │       empty.d.ts
│   │   │       empty.js
│   │   │       empty.js.map
│   │   │       index.d.ts
│   │   │       index.js
│   │   │       index.js.map
│   │   │
│   │   ├───esm
│   │   │       index.mjs
│   │   │
│   │   └───src
│   │           empty.ts
│   │           index.ts
│   │           types.d.ts
│   │
│   ├───pg-connection-string
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───esm
│   │           index.mjs
│   │
│   ├───pg-int8
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───pg-pool
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───esm
│   │           index.mjs
│   │
│   ├───pg-protocol
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───dist
│   │   │       b.d.ts
│   │   │       b.js
│   │   │       b.js.map
│   │   │       buffer-reader.d.ts
│   │   │       buffer-reader.js
│   │   │       buffer-reader.js.map
│   │   │       buffer-writer.d.ts
│   │   │       buffer-writer.js
│   │   │       buffer-writer.js.map
│   │   │       inbound-parser.test.d.ts
│   │   │       inbound-parser.test.js
│   │   │       inbound-parser.test.js.map
│   │   │       index.d.ts
│   │   │       index.js
│   │   │       index.js.map
│   │   │       messages.d.ts
│   │   │       messages.js
│   │   │       messages.js.map
│   │   │       outbound-serializer.test.d.ts
│   │   │       outbound-serializer.test.js
│   │   │       outbound-serializer.test.js.map
│   │   │       parser.d.ts
│   │   │       parser.js
│   │   │       parser.js.map
│   │   │       serializer.d.ts
│   │   │       serializer.js
│   │   │       serializer.js.map
│   │   │
│   │   ├───esm
│   │   │       index.js
│   │   │
│   │   └───src
│   │       │   b.ts
│   │       │   buffer-reader.ts
│   │       │   buffer-writer.ts
│   │       │   inbound-parser.test.ts
│   │       │   index.ts
│   │       │   messages.ts
│   │       │   outbound-serializer.test.ts
│   │       │   parser.ts
│   │       │   serializer.ts
│   │       │
│   │       ├───testing
│   │       │       buffer-list.ts
│   │       │       test-buffers.ts
│   │       │
│   │       └───types
│   │               chunky.d.ts
│   │
│   ├───pg-types
│   │   │   .travis.yml
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   index.test-d.ts
│   │   │   Makefile
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │       arrayParser.js
│   │   │       binaryParsers.js
│   │   │       builtins.js
│   │   │       textParsers.js
│   │   │
│   │   └───test
│   │           index.js
│   │           types.js
│   │
│   ├───pgpass
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           helper.js
│   │           index.js
│   │
│   ├───picomatch
│   │   │   CHANGELOG.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           constants.js
│   │           parse.js
│   │           picomatch.js
│   │           scan.js
│   │           utils.js
│   │
│   ├───postgres-array
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───postgres-bytea
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───postgres-date
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───postgres-interval
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───process-nextick-args
│   │       index.js
│   │       license.md
│   │       package.json
│   │       readme.md
│   │
│   ├───proxy-addr
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───pstree.remy
│   │   │   .travis.yml
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───lib
│   │   │       index.js
│   │   │       tree.js
│   │   │       utils.js
│   │   │
│   │   └───tests
│   │       │   index.test.js
│   │       │
│   │       └───fixtures
│   │               index.js
│   │               out1
│   │               out2
│   │
│   ├───q
│   │       CHANGES.md
│   │       LICENSE
│   │       package.json
│   │       q.js
│   │       queue.js
│   │       README.md
│   │
│   ├───qs
│   │   │   .editorconfig
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   LICENSE.md
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   ├───dist
│   │   │       qs.js
│   │   │
│   │   ├───lib
│   │   │       formats.js
│   │   │       index.js
│   │   │       parse.js
│   │   │       stringify.js
│   │   │       utils.js
│   │   │
│   │   └───test
│   │           empty-keys-cases.js
│   │           parse.js
│   │           stringify.js
│   │           utils.js
│   │
│   ├───random-bytes
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───range-parser
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───raw-body
│   │       HISTORY.md
│   │       index.d.ts
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       SECURITY.md
│   │
│   ├───readable-stream
│   │   │   CONTRIBUTING.md
│   │   │   errors-browser.js
│   │   │   errors.js
│   │   │   experimentalWarning.js
│   │   │   GOVERNANCE.md
│   │   │   LICENSE
│   │   │   package.json
│   │   │   readable-browser.js
│   │   │   readable.js
│   │   │   README.md
│   │   │
│   │   └───lib
│   │       │   _stream_duplex.js
│   │       │   _stream_passthrough.js
│   │       │   _stream_readable.js
│   │       │   _stream_transform.js
│   │       │   _stream_writable.js
│   │       │
│   │       └───internal
│   │           └───streams
│   │                   async_iterator.js
│   │                   buffer_list.js
│   │                   destroy.js
│   │                   end-of-stream.js
│   │                   from-browser.js
│   │                   from.js
│   │                   pipeline.js
│   │                   state.js
│   │                   stream-browser.js
│   │                   stream.js
│   │
│   ├───readdirp
│   │       index.d.ts
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───rimraf
│   │       bin.js
│   │       CHANGELOG.md
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       rimraf.js
│   │
│   ├───router
│   │   │   HISTORY.md
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           layer.js
│   │           route.js
│   │
│   ├───safe-buffer
│   │       index.d.ts
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───safer-buffer
│   │       dangerous.js
│   │       LICENSE
│   │       package.json
│   │       Porting-Buffer.md
│   │       Readme.md
│   │       safer.js
│   │       tests.js
│   │
│   ├───semver
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   preload.js
│   │   │   range.bnf
│   │   │   README.md
│   │   │
│   │   ├───bin
│   │   │       semver.js
│   │   │
│   │   ├───classes
│   │   │       comparator.js
│   │   │       index.js
│   │   │       range.js
│   │   │       semver.js
│   │   │
│   │   ├───functions
│   │   │       clean.js
│   │   │       cmp.js
│   │   │       coerce.js
│   │   │       compare-build.js
│   │   │       compare-loose.js
│   │   │       compare.js
│   │   │       diff.js
│   │   │       eq.js
│   │   │       gt.js
│   │   │       gte.js
│   │   │       inc.js
│   │   │       lt.js
│   │   │       lte.js
│   │   │       major.js
│   │   │       minor.js
│   │   │       neq.js
│   │   │       parse.js
│   │   │       patch.js
│   │   │       prerelease.js
│   │   │       rcompare.js
│   │   │       rsort.js
│   │   │       satisfies.js
│   │   │       sort.js
│   │   │       valid.js
│   │   │
│   │   ├───internal
│   │   │       constants.js
│   │   │       debug.js
│   │   │       identifiers.js
│   │   │       lrucache.js
│   │   │       parse-options.js
│   │   │       re.js
│   │   │
│   │   └───ranges
│   │           gtr.js
│   │           intersects.js
│   │           ltr.js
│   │           max-satisfying.js
│   │           min-satisfying.js
│   │           min-version.js
│   │           outside.js
│   │           simplify.js
│   │           subset.js
│   │           to-comparators.js
│   │           valid.js
│   │
│   ├───send
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───serve-static
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───set-blocking
│   │       CHANGELOG.md
│   │       index.js
│   │       LICENSE.txt
│   │       package.json
│   │       README.md
│   │
│   ├───setprototypeof
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───side-channel
│   │   │   .editorconfig
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───side-channel-list
│   │   │   .editorconfig
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   list.d.ts
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───side-channel-map
│   │   │   .editorconfig
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───side-channel-weakmap
│   │   │   .editorconfig
│   │   │   .eslintrc
│   │   │   .nycrc
│   │   │   CHANGELOG.md
│   │   │   index.d.ts
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │   tsconfig.json
│   │   │
│   │   ├───.github
│   │   │       FUNDING.yml
│   │   │
│   │   └───test
│   │           index.js
│   │
│   ├───signal-exit
│   │       index.js
│   │       LICENSE.txt
│   │       package.json
│   │       README.md
│   │       signals.js
│   │
│   ├───simple-update-notifier
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───build
│   │   │       index.d.ts
│   │   │       index.js
│   │   │
│   │   └───src
│   │           borderedText.ts
│   │           cache.spec.ts
│   │           cache.ts
│   │           getDistVersion.spec.ts
│   │           getDistVersion.ts
│   │           hasNewVersion.spec.ts
│   │           hasNewVersion.ts
│   │           index.spec.ts
│   │           index.ts
│   │           isNpmOrYarn.ts
│   │           types.ts
│   │
│   ├───split2
│   │       bench.js
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       test.js
│   │
│   ├───statuses
│   │       codes.json
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───streamsearch
│   │   │   .eslintrc.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │   └───workflows
│   │   │           ci.yml
│   │   │           lint.yml
│   │   │
│   │   ├───lib
│   │   │       sbmh.js
│   │   │
│   │   └───test
│   │           test.js
│   │
│   ├───string-width
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───string_decoder
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           string_decoder.js
│   │
│   ├───strip-ansi
│   │       index.d.ts
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───supports-color
│   │       browser.js
│   │       index.js
│   │       license
│   │       package.json
│   │       readme.md
│   │
│   ├───tar
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           create.js
│   │           extract.js
│   │           get-write-flag.js
│   │           header.js
│   │           high-level-opt.js
│   │           large-numbers.js
│   │           list.js
│   │           mkdir.js
│   │           mode-fix.js
│   │           normalize-unicode.js
│   │           normalize-windows-path.js
│   │           pack.js
│   │           parse.js
│   │           path-reservations.js
│   │           pax.js
│   │           read-entry.js
│   │           replace.js
│   │           strip-absolute-path.js
│   │           strip-trailing-slashes.js
│   │           types.js
│   │           unpack.js
│   │           update.js
│   │           warn-mixin.js
│   │           winchars.js
│   │           write-entry.js
│   │
│   ├───to-regex-range
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───toidentifier
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───touch
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───bin
│   │           nodetouch.js
│   │
│   ├───tr46
│   │   │   .npmignore
│   │   │   index.js
│   │   │   package.json
│   │   │
│   │   └───lib
│   │           .gitkeep
│   │           mappingTable.json
│   │
│   ├───type-is
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───typedarray
│   │   │   .travis.yml
│   │   │   index.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   readme.markdown
│   │   │
│   │   ├───example
│   │   │       tarray.js
│   │   │
│   │   └───test
│   │       │   tarray.js
│   │       │
│   │       └───server
│   │               undef_globals.js
│   │
│   ├───uid-safe
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───undefsafe
│   │   │   .jscsrc
│   │   │   .jshintrc
│   │   │   .travis.yml
│   │   │   example.js
│   │   │   LICENSE
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   ├───.github
│   │   │   └───workflows
│   │   │           release.yml
│   │   │
│   │   └───lib
│   │           undefsafe.js
│   │
│   ├───unpipe
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───util-deprecate
│   │       browser.js
│   │       History.md
│   │       LICENSE
│   │       node.js
│   │       package.json
│   │       README.md
│   │
│   ├───vary
│   │       HISTORY.md
│   │       index.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───webidl-conversions
│   │   │   LICENSE.md
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           index.js
│   │
│   ├───whatwg-url
│   │   │   LICENSE.txt
│   │   │   package.json
│   │   │   README.md
│   │   │
│   │   └───lib
│   │           public-api.js
│   │           URL-impl.js
│   │           url-state-machine.js
│   │           URL.js
│   │           utils.js
│   │
│   ├───wide-align
│   │       align.js
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │
│   ├───wrappy
│   │       LICENSE
│   │       package.json
│   │       README.md
│   │       wrappy.js
│   │
│   ├───xtend
│   │       .jshintrc
│   │       immutable.js
│   │       LICENSE
│   │       mutable.js
│   │       package.json
│   │       README.md
│   │       test.js
│   │
│   └───yallist
│           iterator.js
│           LICENSE
│           package.json
│           README.md
│           yallist.js
│
└───views
    │   404.ejs
    │   about.ejs
    │   browse.ejs
    │   contents.ejs
    │   create_account.ejs
    │   create_new.ejs
    │   index.ejs
    │   login.ejs
    │   manage.ejs
    │   map.ejs
    │   profile.ejs
    │   reviews.ejs
    │
    └───partials
            browse-help.ejs
            content-help.ejs
            content-rows.ejs
            contents-tab.ejs
            footer.ejs
            header.ejs
            mapPop.ejs
            reply-card.ejs
            review-card.ejs
            storage-card.ejs

## How to install & run the project
**To install (In order, install location within project folder)**
- VSCODE (HTML, CSS, JAVASCRIPT)
- npm install <modules>
    --> "@huggingface/inference": "^3.13.1",
        "bcrypt": "^5.1.1",
        "cloudinary": "^2.6.1",
        "connect-pg-simple": "^10.0.0",
        "dotenv": "^16.5.0",
        "ejs": "^3.1.10",
        "express": "^5.1.0",
        "express-session": "^1.18.1",
        "joi": "^17.13.3",
        "multer": "^1.4.5-lts.2",
        "nodemailer": "^7.0.3",
        "pg": "^8.15.6"
- DATABASE (PostgreSQL)
- OTHER SOFTWARE - Make an account with:
    --> Aiven
    --> Render
    --> Cloudinary

**APIs to download-API Keys required (No order, install location does not matter)**
- Huggingface
- Google Maps
- Cloudinary

**Configuration Instructions**
1. Download & Install VSCODE
2. Clone Github repo
3. Install modules
4. Create software tool accounts
5. link PostgreSQL database
6. Create .env file 
7. Run app on Render


**Testing History Link**
https://docs.google.com/spreadsheets/d/14qsCwUBqw6GbWuQX1b8dv6053UVuntqewIn6T9rG-Cs/edit?usp=sharing 

## Features (How to use the product)
- Donate Items
- Take Items
- See directions from where the user is
- See the pin on the map 
- Create a new fridge or pantry
- Add review 
- Reply to reviews
- Upload pictures to reviews and replies, and creating a fridge or a pantry
- Favourite fridges/pantries
- Get email notification when a fridge/pantry is restocked on the users favourite fridge

## Credits, References, Licenses
**CREDITS**
Developed by: Isabel C, Ana S, Wynn L, Shivuan B, Luka P
**MENTORSHIP & GUIDANCE**
Thank you to our instructors and mentors at BCIT, we would especially like to thank Hassan for his guidance throughout our project. 


## How did we use AI or any API's
Google map API is used to het users locations and converts the address of storages to the geo locations to store int he database. Moreover, a google map with pins of all avaialblr storage is also emmbed in the home page of the app, making it easier to access the direction of the storages.

Huggingface API was used to implement AI for checking user input in the text field of the donation function. When a user attempts to donate a food item, our app classifies the input as “food” or “not food”, and prompts the user to try again if the input is not recognized as food. 

## Contact Information
**Email**
becoolcommunityproject@gmail.com
**Github**
https://github.com/ShivaunBartoo/2800-202510-BBY08 
**Hosted Link**
https://two800-202510-bby08.onrender.com/ 