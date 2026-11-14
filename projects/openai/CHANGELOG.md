# 20.0.0

- [x] **Breaking**: rewrite for Angular 20+ (``@angular/common`` and ``@angular/core`` ``>=20.0.0``) and ``openai`` 7.x (peer dependency ``^7.0.0``); 14.x and 15.x are deprecated ([#183](https://github.com/AsheTM/ng-services/issues/183))
- [x] The version follows the Angular version it starts from: 20.x for Angular 20+
- [x] **Breaking**: the API key no longer goes to the browser: ``OpenaiModule.forRoot({ apiKey })``, ``OpenaiService``, ``OPENAI_TOKEN_CONFIGURATION``, ``AOpenaiConfiguration``, ``TOpenaiConfiguration`` and ``OpenairootModule`` are removed
- [x] New project setup: ESLint, Karma, ``inject()``, standalone providers ([#184](https://github.com/AsheTM/ng-services/issues/184))
- [x] Create ``provideOpenAI()`` and ``injectOpenAI()``: the official client, pointed at the app's proxy, with a placeholder key; ``OPENAI``, ``OPENAI_CONFIG`` and ``OPENAI_PROXY_API_KEY`` tokens ([#185](https://github.com/AsheTM/ng-services/issues/185))
- [x] New entry point ``@ashetm/ng-openai/signals``: ``openaiStream()`` (streamed replies in signals) and ``openaiResource()`` (reply text as a ``resource()``) ([#186](https://github.com/AsheTM/ng-services/issues/186))
- [x] New entry point ``@ashetm/ng-openai/server``: ``createOpenAIProxy()``, which adds the key on the server and only lets through the allowed endpoints and models ([#187](https://github.com/AsheTM/ng-services/issues/187))
- [x] Update CHANGELOG
- [x] Update README ([#188](https://github.com/AsheTM/ng-services/issues/188))

# 15.0.2

- [x] Add package metadata

# 15.0.1

- [x] Add package metadata

# 15.0.0

- [x] Support Angular 15

# 14.0.1

- [x] Add package metadata

# 14.0.0

- [x] Implement openai module and service
