# @ashetm/ng-openai

``@ashetm/ng-openai`` is a wrapped library of ``openai`` for Angular.

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->


<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-openai
```

## Import

You only need to import ``OpenaiModule``.

```ts
...
import { OpenaiModule, TOpenaiConfiguration } from '@ashetm/ng-openai';
...
@NgModule({
  ...
  imports: [
    ...
    OpenaiModule.forRoot(configuration as TOpenaiConfiguration), 
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-mediastream`` exposes the following: 

### Modules

* ``OpenaiModule``, that needs to import in order to use the library

### Services

#### OpenaiService

``OpenaiService`` is a service concern all about ``openapi``.

And for methods, they are the same methods for openai open source library.

### Tokens

#### OPENAI_TOKEN_CONFIGURATION

``OPENAI_TOKEN_CONFIGURATION`` is a token that provide configuration provided in ``OpenaiModule.forRoot`` static method.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
