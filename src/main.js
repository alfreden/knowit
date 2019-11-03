import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            'etasje': 0,
            'stopp': false,
            'retning': 'stoppet',
            'eta': 0,
            'count': 0,
            'toFloors': [],
            'isRunning': false,
            'hvilkenetasje': 0,
            'value': 0
        }
 
    };

    tilEtasje = function tilEtasje(fra, til) {
        let variasjon = 0;
        this.setState({ toFloors: this.state.toFloors.sort() });

        if (fra > til) {
            var checkTil;
            for (let i = 0; i < this.state.toFloors.length; i++) {
                if (this.state.toFloors[i] === til) {
                    checkTil = true;
                }
            }
            if (!checkTil) {
                if (this.state.retning === 'stopped' || this.state.retning !== 'opp'){
                    this.setState({ 'retning': 'ned' });
                variasjon = til - fra;
                this.state.toFloors.push(til);
                this.setState({ toFloors: this.state.toFloors.sort() });
                this.timer();
            }
        }
    
            
        } if (fra < til) {
            variasjon = fra - til;
            var checkTil;
            for (let i = 0; i < this.state.toFloors.length; i++) {
                if (this.state.toFloors[i] === til) {
                    checkTil = true;
                }
            }
            if (!checkTil) {
                if (this.state.retning === 'stopped' || this.state.retning !== 'ned') {
                    this.setState({ 'retning': 'opp' });
                    variasjon = til - fra;
                    this.state.toFloors.push(til);
                    this.setState({ toFloors: this.state.toFloors.sort() });
                    this.timer(til);
                }
            }
        }
    }

    stopheisen = function () {
        this.timer("stopp");
        this.setState({
            toFloors: [],
            isRunning: false,
            retning: "stoppet"
        });
    }

    hvorLangTidIgjen = function (tilEtasje) {
        var etasjerimellom;
        console.log(tilEtasje);
        var hvormangestopp = this.state.toFloors.length * 5;
        if (tilEtasje < this.state.etasje) {
            etasjerimellom = this.state.etasje - tilEtasje;
        } else {
            etasjerimellom = this.state.etasje + tilEtasje;
        }
        hvormangestopp = hvormangestopp - 5;
        var utregnet = etasjerimellom + hvormangestopp;
        this.setState({ estimertTid: utregnet })
    }

    timer = function (stopp) {
        if (stopp === "stopp" || this.state.toFloors[0] === this.state.etasje) {
            console.log("stopped");
            clearInterval(this.timerx);
            clearTimeout(this.timeoutx);
        } else {
            if (this.state.isRunning === false || this.state.retning === "stoppet") {
                this.setState({isRunning: true})
                this.timerx = setInterval(() => {
                    console.log(this.state.toFloors);
                    if (this.state.retning === 'ned') {
                        this.setState({ etasje: this.state.etasje - 1 });
                        if (this.state.toFloors[this.state.toFloors.length - 1] === this.state.etasje) {
                            clearInterval(this.timerx);
                            this.state.toFloors.pop();
                            this.setState({ isRunning: false });
                            if (this.state.toFloors.length === 0) {
                                this.setState({ retning: "stoppet" });
                            } else {
                                var timeoutx = setTimeout(() => { this.timer(); this.setState({ retning: 'ned' }); }, 5000);
                            }
                        }
                    } else {
                        this.setState({ etasje: this.state.etasje + 1 });
                        if (this.state.toFloors[0] === this.state.etasje) {
                            clearInterval(this.timerx);
                            this.state.toFloors.shift();
                            this.setState({ isRunning: false });
                            if (this.state.toFloors.length === 0) {
                                this.setState({ retning: "stoppet" });
                            } else {
                                var timeoutx = setTimeout(() => { this.timer(); this.setState({ retning: 'opp' }); }, 5000);
                            }
                        }
                    }

                    if (this.state.toFloors[this.state.toFloors.length - 1] === this.state.etasje || this.state.toFloors[0] === this.state.etasje) {
                        this.setState({ isRunning: false, retning: "stoppet" });
                        clearInterval(this.timerx);                        
                    }
                }, 1000);
            } 
        }
    }

    tilkallheisen(etasje) {
        this.state.toFloors.push(etasje);
        var retning;

        if (this.state.etasje > etasje) {
            retning = "ned"
        } else {
            retning = "opp"
        }
        this.setState({ toFloors: this.state.toFloors.sort(), retning: retning });
        this.timer();
    }

    handleChange(event) {
        this.setState({ hvilkenetasje: parseInt(event.target.value) });
    }

    render() {
        return <div>
            <h1>Etasje: {this.state.etasje}</h1>
            <h1>Retning: {this.state.retning}</h1>
            <h1> tid igjen: {this.state.estimertTid}</h1>
            <h1>kjører: {this.state.isRunning}</h1>
            <div>
                <ul>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 0)}> 0 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 1)}> 1 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 2)}> 2 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 3)}> 3 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 4)}> 4 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 5)}> 5 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 6)}> 6 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 7)}> 7 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 8)}> 8 </button></li>
                    <li><button onClick={() => this.tilEtasje(this.state.etasje, 9)}> 9 </button></li>
                </ul>
                <button onClick={() => this.tilkallheisen(parseInt(this.state.hvilkenetasje, 10))}>Tilkall heisen</button>
                <button onClick={() => this.stopheisen()}>STOPP</button>
            </div>
            <button onClick={() => this.hvorLangTidIgjen(parseInt(this.state.hvilkenetasje, 10))}>estimert tid</button>
            <label>Hvilken etasje?
                <input type="number" value={this.state.hvilkenetasje} onChange={(e) => this.handleChange(e)} />
            </label>
            </div>;
    }
}

export default Main;