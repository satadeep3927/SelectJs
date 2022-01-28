class Select {
    constructor(select, styles = {
        accent: '#3681ff',
        padding: '6px 10px',
        shadowColor: 'rgba(0, 0, 255, 0.327)',
        width: '100%',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        background: 'white',
        color: 'black',
        hoverColor: 'white'
    }, searchable = false) {
        this.select = select;
        this.searchable = searchable;
        this.styleRules = this.__styleRules(styles);
    }


    __styleRules(styles) {
        let styleRules = `.custom--select__container{
            width: ${styles.width};
            position: relative;
        }
        .custom--select__button{
            padding: ${styles.padding};
            text-align: left;
            outline: 0;
            color:${styles.color};
            border: 1.2px solid ${styles.borderColor};
            background-color: ${styles.background};
            border-radius: 2px;
            cursor: ${this.searchable == true ? 'auto' : 'pointer'};
            transition: 0.3s;
            position: relative;
        }
        
        .custom--select__button:focus{
            box-shadow: 0 0 2px ${styles.shadowColor};
        }
        .custom--select__button.--focus + .custom--select__list{
            opacity: 1;
            pointer-events: unset;
        }
        .custom--select__button::after{
            content: '⌵';
            position: absolute;
            right: 3px;
            color: inherit;
            opacity: 0.3;
            pointer-events:none;
        }
        .custom--select__list::-webkit-scrollbar{
            width:4px;
        }
        .custom--select__list::-webkit-scrollbar-thumb{
            background:#0001;
            opacity:0.7;
        }
        .custom--select__list{
            list-style: none;
            opacity: 0;
            z-index:99;
            max-height:240px;
            overflow-y:auto;
            pointer-events: none;
            width: ${styles.width};
            position: absolute;
            margin-block-start: 0.7em;
            padding: 0;
            box-shadow: 0 0 8px #0001;
            transition: 0.1s;
            background-color: ${styles.background};
            scroll-behavior: smooth;
        }
        .custom--select__item{
            padding: ${styles.padding};
            cursor: pointer;
            transition: 0.3s;
            color:${styles.color};
        }
        .custom--select__item.active,.custom--select__item:hover{
            color: ${styles.hoverColor};
            background-color: ${styles.accent};
        }`;

        return styleRules;
    }

    __listContent(elem) {
        let values = ``;
        let options = elem.querySelectorAll('option');
        let count = 0;
        Array.from(options).forEach((e) => {
            values += `<li class="custom--select__item ${count == 0 ? 'active' : ''}" data-value="${e.value}">${e.innerHTML}</li>`;
            count++;
        })

        let ul = `<ul class="custom--select__list">${values}</ul>`
        return ul;

    }
    __buttonElement(elem) {
        let selected = elem.querySelectorAll('option')[0].innerHTML;
        let button = `<div tabindex="0" class="custom--select__button" contenteditable="${this.searchable}">${selected}</div>`;
        return button;
    }
    __removeFocus(elem) {
        elem.querySelector('.custom--select__button').classList.remove('--focus');
    }
    __addEvents(elem, select) {
        elem.querySelector('.custom--select__button').addEventListener('click', (e) => {
            e.target.classList.add('--focus');
            e.stopPropagation();

        });
        document.addEventListener('click', () => {
            this.__removeFocus(elem);
        })
        elem.querySelector('.custom--select__button').addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.target.blur();
                this.__removeFocus(elem);
            }
            else if (e.key === 'ArrowDown') {
                let target = elem.querySelector('.custom--select__item.active');
                if (target == null) {
                    elem.querySelector('.custom--select__item:first-child').classList.add('active');
                    target = elem.querySelector('.custom--select__item.active');
                }
                if (target.nextSibling !== null) {
                    target.nextSibling.classList.add('active');
                    target.classList.remove('active');
                }
            }
            else if (e.key === 'ArrowUp') {
                let target = elem.querySelector('.custom--select__item.active');
                if (target == null) {
                    elem.querySelector('.custom--select__item:last-child').classList.add('active');
                    target = elem.querySelector('.custom--select__item.active');

                }
                if (target.previousSibling !== null) {
                    target.previousSibling.classList.add('active');
                    target.classList.remove('active');
                }
            }
            else if (e.key === 'Enter') {
                let target = elem.querySelector('.custom--select__item.active');
                let text = target.innerHTML;
                let value = target.dataset.value;

                select.value = value;
                select.dispatchEvent(new Event('change'));
                e.target.innerHTML = text;
                e.target.blur();
                this.__removeFocus(elem);

            }

            else {
                if (this.searchable == false) {
                    let key = e.key;
                    let check = true;
                    elem.querySelectorAll('.custom--select__item').forEach((t) => {
                        if (t.innerHTML[0].toLowerCase() === key && check) {
                            check = false;
                            t.classList.add('active');
                            t.scrollIntoView();
                            return false;
                        }
                        t.classList.remove('active');
                    })
                }

            }

        })
        if (this.searchable == true) {
            elem.querySelector('.custom--select__button').addEventListener('input',(e)=>{
                let str = e.target.innerHTML;
                elem.querySelectorAll('.custom--select__item').forEach((i)=>{
                    if(i.innerHTML.toLowerCase().includes(str.toLowerCase()))
                    {
                        i.style.display = 'block';
                    }
                    else{
                        i.style.display = 'none';
                    }
                    i.classList.remove('active');
                })
                elem.querySelector('[style="display: block;"]')?.classList.add('active');
            })
        }
        elem.querySelectorAll('.custom--select__item').forEach((t) => {
            t.addEventListener('click', (e) => {
                e.stopPropagation();
                let text = e.target.innerHTML;
                let value = e.target.dataset.value;
                elem.querySelectorAll('.custom--select__item').forEach((t1) => {
                    t1.classList.remove('active')
                });
                t.classList.add('active');
                select.value = value;
                select.dispatchEvent(new Event('change'));
                elem.querySelector('.custom--select__button').innerHTML = text;
                this.__removeFocus(elem);
            });
        });
    }
    init() {
        document.querySelectorAll(this.select).forEach((elem) => {
            elem.style.display = 'none';
            let styleElem = document.createElement('style');
            styleElem.innerHTML = this.styleRules;
            document.head.append(styleElem);
            let container = document.createElement('div');
            container.classList.add('custom--select__container');
            container.innerHTML += this.__buttonElement(elem);
            container.innerHTML += this.__listContent(elem);
            this.__addEvents(container, elem);
            elem.refresh = function () {
                console.log('func')
            }
            elem.after(container);
        });
    }
}
