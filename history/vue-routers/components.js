var Main=Vue.component("Main",{
    template:`
            <div class="template">
                <!--<div class="heade">
                    <nav>导航</nav>
                </div>-->
                <div class="body">
                    <div class="left">
                        <router-view name="left"></router-view>
                    </div>
                    <div class="right">
                        <router-view name="right"></router-view>
                    </div>
                </div>
            </div>
            `
})
var Left=Vue.component("Menu",{
    data(){
        return {
            menu:[

            ]
        }
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    created:function(){
        fetch("./demo.txt").then(function (e) {
            return e.json();
        }).then(e=>{
            this.menu=e;
            console.log(this.menu)
        })
    },
    template:`
             <div> 
                <ul>
                    <div v-for="item in data">
                        <!--<li class="li1">{{item.title}}</li>-->
                        <router-link :to="'#'+item.id">{{item.title}}</router-link>
                        <ul>
                            <li v-for="item1 in item.child" class="li2"><router-link :to="'#'+item1.id">{{item1.title}}</router-link></li>
                        </ul>
                    </div>
                </ul>
             </div>
             `,
    watch:{
        $route(){
            var num="#a"+this.$route.hash.slice(1);
            var pos=document.querySelector(num).offsetTop-20;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number:  document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate();
        }
    }
})
var Right=Vue.component("Menu",{
    data(){
        return {
            data:""
        }
    },
    mounted(){
        fetch("./md.txt").then(function (e) {
            return e.text();
        }).then(e=>{
            this.data=e;
        })
    },
    template:`
             <div v-html="data" class="markdown-body">{{data}}</div>
             `
})
var Quick=Vue.component("Quick",{
    data(){
        return {
            data:"你好你好你好\n你好你好你好\n你好你好你好\n你好你好你好\n你好你好你好<br>\n你好你好你好\n你好你好你好\n你好你好你好\n你好你好你好\n你好你好你好<br>"
        }
    },
    template:`
                <div class="quick">
                    {{data}}
                </div>
            `
})