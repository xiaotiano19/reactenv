import React, { Component } from 'react'
import axios from 'axios'
import Img1 from './img/1.gif'
import Style from './css/style.css'

class App extends Component {
    render() {
        return (
            <div>
                App组件
                <img src={Img1} />
                <a href="ff.html">ff</a>
                <span>good</span>
                <p className={Style.special}>123456</p>
            </div>
        )
    }
    componentDidMount() {
        axios.get('/data')
            .then(res => {
                console.log(res.data);
            })
    }
}
export default App;
