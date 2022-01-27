## SelectJs

**SelectJs** is a minimalistic and light-weight Javascript library to create your own, awesome select Element

You can clone Standalone Javascript file from Github or use JSDeliver CDN Link.

### Documantation

Here is short and Easy Tutorial On SelectJs

```markdown
...
<!-- HTML Code -->

<select class="custom-select">
    <option value="C++">C++</option>
    <option value="Java">Java</option>
    <option value="Python">Python</option>
    <option value="C#">C#</option>
    <option value="JavaScript">JavaScript</option>
    <option value="Go">Go</option>
</select>

...
```
JavaScript Code

```markdown
...
//app.js

//initiating Select Element with DOM Selector

const select = new Select('.select').init();

...
```
You can Add Styles By passing a Style Object
```markdown
...
const styles = {
    accent: 'crimson',
    padding: '6px 10px',
    shadowColor:'crimson',
    width:'100%',
    borderColor:'crimson',
    background:'#5d5d5d',
    color:'white',
    hoverColor:'white'
   };
const select = new Select('select', styles).init();

...
```
Result 
![Result Image](https://user-images.githubusercontent.com/63926708/151357140-68b39291-2b76-4b8a-a62b-f3f064ea4703.png)

#### Library is still under developemnet. Please don't hesitate to report a bug. Contributers are always welcome.
Github Repo : https://github.com/satadeep3927/SelectJs
JSDeliver CDN : https://cdn.jsdelivr.net/gh/satadeep3927/SelectJs/select.min.js

