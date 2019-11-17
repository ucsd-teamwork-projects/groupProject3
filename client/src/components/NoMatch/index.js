import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './style.css';

export class index extends Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span>0</span>4</h1>
                    </div>
                    <h2>You seem lost...</h2>
                    <form>
                        <p></p>
                        <Button as={Link} to="/" style={{backgroundColor: "#ffc038", outlineColor: "#000", color: "#000"}}>
                            ...Lets get you home.  <i class="fas fa-home fa-2x"></i>
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default index
