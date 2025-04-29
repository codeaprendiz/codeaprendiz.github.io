## Static Portfolio Website Using Github Pages

[https://ankitrathi.info](https://ankitrathi.info)

### HomePage

![img](.images/image-2025-04-29-13-37-41.png)
![](images/2022-08-01-22-35-24.png)

## AboutMe

![](images/2022-08-01-22-36-31.png)

## Experience

![](images/2022-08-01-22-37-07.png)

## Projects

![](images/2022-08-01-22-37-51.png)

- [bootstrap docs](https://getbootstrap.com/docs/5.0/getting-started/introduction)
- [icons](https://icons.getbootstrap.com)
- [navbar](https://getbootstrap.com/docs/5.0/components/navbar)
- [Carousel](https://getbootstrap.com/docs/5.0/components/carousel)
- [Accordion](https://getbootstrap.com/docs/5.0/components/accordion)
- [accordion/#flush](https://getbootstrap.com/docs/5.0/components/accordion/#flush)
- [google fonts](https://fonts.google.com/)
- [manypixels.co/gallery](https://www.manypixels.co/gallery)
- [getwaves.io](https://getwaves.io)
- [github.com/biati-digital/glightbox](https://github.com/biati-digital/glightbox)
- [npmjs.com/package/glightbox](https://www.npmjs.com/package/glightbox)
- [fontawesome.com/v5/cheatsheet](https://fontawesome.com/v5/cheatsheet)
- [tablericons.com](https://tablericons.com)

- Version

```
$ node -v                                                           
v16.13.1
$ npm -v      
8.1.2
```

- Init

```bash
$ npm init             
```


- Dev dependency add

```bash
$ npm install --save-dev sass 

```

- Add bootstrap dependency

```bash
$ npm install --save bootstrap 

```


- Install fontawesome free

```bash
$ npm install --save @fortawesome/fontawesome-free

```

- Install postcss-cli

```bash
$ npm install postcss-cli autoprefixer            
```

- Create the following folders and files

```bash
$ mkdir scss        

$ touch scss/style.scss

$ npm run compile:sass         

> bootstrap-v5@1.0.0 compile:sass
> sass scss:assets/css
```

- Now add the watch flag

```json
    "compile:sass": "sass --watch scss:assets/css"

```

- Add file 

```bash
$ touch scss/_custom.scss
$ touch theming-kit.html       
```

- You can open the content of theming-kit.html using `Live Server`


- Create folders

```bash
$ mkdir -p scss/sections                                       
$ mkdir -p scss/components 

$ touch scss/components/_buttons.scss
$ touch scss/components/_animations.scss 
$ touch scss/components/_mixins.scss    
$ touch scss/components/_typography.scss 

$ touch scss/sections/_navbar.scss  
$ touch scss/sections/_intro-section.scss 
$ touch scss/sections/_companies.scss    
$ touch scss/sections/_services.scss 
$ touch scss/sections/_testimonials.scss
$ touch scss/sections/_faq.scss         
$ touch scss/sections/_portfolio.scss
$ touch scss/sections/_get-started.scss
$ touch scss/sections/_footer.scss     
```


