var count = 0;
var snake = new snake();
var food = new food();
var timer;
var k=300-100*count;
window.onload = function() {
    snake.display();
    food.display();
    document.onkeydown = function(event) {
        var code;
        if (window.event) {
            code = window.event.keyCode;
        } else {
            code = event.keyCode;
        }
        if (code == 80) {
            /**
             * 这里加上什么能让游戏暂停呢...?
             */
             alert("暂停");
        }
        snake.setKey(code);
    }
    
    timer = setInterval('snake.move()', k);
    
}

function food() {
    var foodcell;
    this.x = null;
    this.y = null;
    this.display = function() {
        
        document.getElementById("count").innerHTML = count.toString();
        //随机生成食物
        this.x = Math.floor(Math.random() * 39);
        this.y = Math.floor(Math.random() * 29);
        foodcell = document.createElement("div");
        foodcell.style.width = 10 + "px";
        foodcell.style.height = 10 + "px";
        foodcell.style.backgroundColor = "#ffff00";
        foodcell.style.position = "absolute";
        foodcell.style.left = this.x * 10 + "px";
        foodcell.style.top = this.y * 10 + "px";
        document.getElementById("map").appendChild(foodcell);
        /**
         * 这里加上什么能使分数增加呢...?
         */
        count++;
    }
}

function snake() {
    this.setKey = function(code) {
        switch (code) {
            case 37:
                this.direct = 'left';
                break;
            case 38:
                this.direct = 'top';
                break;
            case 39:
                this.direct = 'right';
                break;
            case 40:
                this.direct = 'bottom';
                break;
                /**
                 * 这里加上什么能让小蛇受WASD控制呢?
                 */
                 case 65:
                    this.direct = 'left';
                    break;
                case 87:
                    this.direct = 'top';
                    break;
                case 68:
                    this.direct = 'right';
                    break;
                case 83:
                    this.direct = 'bottom';
        
            default:
                break;
        }
    }
    var m,n;
    m=Math.floor(Math.random()*10);
    n=Math.floor(Math.random()*10);
    this.body = [
        [m+3, n, '#ffffff'],
        [m+2, n, '#ffffff'],
        [m+1, n, '#ffffff'],
        [m, n, '#000000']
    ];
    this.display = function() {
        for (var i = 0; i < this.body.length; i++) {
            var bodycell;
            bodycell = document.createElement("div");
            bodycell.style.width = 10 + "px";
            bodycell.style.height = 10 + "px";
            bodycell.style.backgroundColor = this.body[i][2];
            bodycell.style.position = "absolute";
            bodycell.style.left = this.body[i][0] * 10 + "px";
            bodycell.style.top = this.body[i][1] * 10 + "px";
            document.getElementById("map").appendChild(bodycell);
        }
    }
    this.direct = 'right';
    this.move = function() {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i][0] = this.body[i - 1][0];
            this.body[i][1] = this.body[i - 1][1];
        }
        switch (this.direct) {
            case 'left':
                this.body[0][0]--;
                break;
            case 'top':
                this.body[0][1]--;
                break;
            case 'right':
                this.body[0][0]++;
                break;
            case 'bottom':
                this.body[0][1]++;
                break;
        }
        if (this.body[0][0] == food.x && this.body[0][1] == food.y) {
            var x = this.body[this.body.length - 1][0];
            var y = this.body[this.body.length - 1][1];
            /**
             * 这里加上什么能让小蛇吃到食物后长度增加呢...?
             */
            this.body.push([x,y,"#000000"]);
            //this.body[this.body.length - 1][2] = "#000000";
            this.body[this.body.length - 2][2] = "#ffffff";
            food.display();
        }
        if (this.body[0][0] == 40 || this.body[0][0] == -1 ||
            this.body[0][1] == -1 || this.body[0][1] == 30) {
            alert("Game Over，" + "积分：" + (count-1));
            /**
             * 这里加上什么能让游戏重新开始呢...?
             */
            
            clearTimeout(timer);
            window.location.reload()
        }
        //小蛇倒退游戏结束
        for (var i = 1; i < this.body.length - 1; i++) {
            if (this.body[0][0] == this.body[i][0] &&
                this.body[0][1] == this.body[i][1]) {
                alert("Game Over，" + "积分：" + (count-1));
                /**
                 * 这里加上什么能让游戏重新开始呢...?
                 */
                clearTimeout(timer);
                window.location.reload()
            }
        }
        this.display();
    }
}