//'react'=>'node_modules/react/index.js'
import React, { Component } from 'react'
import axios from 'axios';
import Img from './img/1.gif';
import Style from './css/style'
console.log("Img", Img);
class App extends Component {
    render() {
        return (
            <div>
                <h3>App组件1234</h3>
                <img src={Img} /><br />
                <span>good</span>
                <div className={Style.special}>div标签special类</div>
                <p className={Style.one}>p标签one类</p>
                <h3 id={Style.a}>h3标签</h3>
            </div>
        )
    }
    commponentDidMount() {
        axios.get("/data")
            .then(res => {
                console.log(res.data);
            })
    }
}
export default App;