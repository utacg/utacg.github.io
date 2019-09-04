# UTACG Website
University of Toronto Animation Comic Gaming Association's website.  <a href="utacg.github.io">utacg.github.io</a>

多伦多大学utacg社团的社团主页。

Currently under early development

## Contributing
### Ops Team
__Updating Galleries Collections__ Put all the gallery images into `gallery/`,  add the path to `_data/gallery-pic.yml` as 
```
- src: PATH OF THE IMAGE
  type: THE TAG OF THE IMAGE
  credit: NAME OF THE CREATOR
```

__Updating Posts__ Put the markdown and associated images into `_post/`, fill in the title and src of the header image. Make  the filename `YYYY-MM-DD-AUTHOR`

__Updating Calendar__ Add an event object to `assets/data/events.json` as 
```
{
    "title": "TITLE",
    "start": "YYYY-MM-DDTHH:MM:SS",
    "end": "YYYY-MM-DDTHH:MM:SS",
    "url": "PATH TO ASSOCIATED POST"
}
```

### Dev Team
This project is built based on <a href="https://jekyllrb.com/">Jekyll</a>. 

To run a full build, refers to <a href="https://jekyllrb.com/docs/">Jekyll's Documentation</a>. 

In order to build the website, you need to have ruby installed(version >= 2.5.x)
and bundle, jekyll installed as well. Follow instructions on https://jekyllrb.com/docs/installation/windows/ for installation.

To build the website, first download the dependencies:

    $ bundle

If exeucting the first time, run to make sure the correct version of dependency is used:

    $ bundle exec jekyll serve

else you just run:

    $ jekyll serve

You should see website running on http://localhost:4000

## Dependencies
Template powered by colorlib. 
