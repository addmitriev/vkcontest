(function () {

    var t = function (item) {
        return chrome.i18n.getMessage(item);
    };

    var dragObj = null;
    var offsetLeft = null;
    var offsetTop = null;
    function draggable(obj)
    {
        obj.style.position = "absolute";
        obj.onmousedown = function(e){
            if (e.target.tagName != 'H3') return true;
            if(e.stopPropagation) e.stopPropagation();
            if(e.preventDefault) e.preventDefault();
            dragObj = obj;
            offsetLeft = e.layerX;
            offsetTop = e.layerY;


        }
    }

    document.onmouseup = function(e){
        dragObj = null;
    };

    document.onmousemove = function(e){
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        var x = e.pageX - offsetLeft/2;
        var y = e.pageY - offsetTop/2;



        if(dragObj == null)
            return;

        dragObj.style.left = x +"px";
        dragObj.style.top= y +"px";
    };


    var vkContest = function () {
        var self = this;

        self.lastRandomNumber = null;

        self.init = function () {
            self.initMenu();
            self.numberReposts();
            self.initRandomNumber();
        };

        self.current_href = window.location.href;

        window.setInterval(function () {
            if (self.current_href != window.location.href) {
                self.current_href = window.location.href;
                self.numberReposts();
            }
        }, 150);


        self.initMenu = function () {
            var menu = document.createElement('li');
            menu.className = 'vk_contest';

            self.menuItem = menu;

            menu.innerHTML = '<a href="javascript:void(0);" class="mm_item al_menu">' +
            '<i class="i_icon"></i>' +
            '<span class="mmi_wrap"><span class="mm_label">' + t('menu') + '</span></span>' +
            '</a>';

            document.querySelector('.main_menu').appendChild(menu);

            menu.onclick = function (event) {
                event.preventDefault();
                self.toggleRandomGenerator(event);
            };

        };

        self.initRandomNumber = function () {
            var formWrapper = document.createElement('div');
            formWrapper.className = 'vk_contest-random-wrapper';
            formWrapper.style.display = 'none';

            formWrapper.innerHTML = '<h3><i class="repost_icon i_icon"></i>'+t('vkContest')+'</h3>';

            var form = document.createElement('form');
            form.className = 'vk_contest-random';
            form.innerHTML = '<input name="min" type="text" value="1"/>';
            form.innerHTML += '<input name="max" type="text" value="50"/>';
            form.innerHTML += '<span class="vk-contest_result"></span>'

            var submit = document.createElement('input');
            submit.type = 'submit';
            submit.value = 'Generate';



            form.appendChild(submit);
            formWrapper.appendChild(form);

            form.onsubmit = function (e) {
                e.preventDefault();
                var min = this.elements['min'].value;
                var max = this.elements['max'].value;

                var result = self.generateRandomNumber(max, min);

                document.querySelector('.vk-contest_result').innerHTML = result;



            };

            document.querySelector('body').appendChild(formWrapper);

            self.randomNumberWrapper = formWrapper;

            formWrapper.style.left = '10px';
            formWrapper.style.top = self.menuItem.offsetTop + 'px';

            draggable(formWrapper)


        };

        self.generateRandomNumber = function(max, min){
            var result = Math.floor(Math.random() * (max - min + 1) + min);
            if (result == self.lastRandomNumber || result == 0){
                result = self.generateRandomNumber();
            }

            return result;
        };

        self.toggleRandomGenerator = function (event) {
            var element = self.randomNumberWrapper;
            if ((element.style.display !== 'none')) {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }

        };

        self.numberReposts = function () {
            var posts = document.querySelectorAll('.mcont .items .inline_item')
            for (var i in posts) {
                posts[i].innerHTML = '<span class="vk_contest-repost-number">#' + (parseInt(i) + 1) + '</span>' + posts[i].innerHTML
            }
        };


        self.init()
    };

    vkContest();

})();

