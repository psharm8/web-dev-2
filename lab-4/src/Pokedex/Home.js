/**
 * Created by only2 on 14-10-2017.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Panel} from 'react-bootstrap';
class Home extends Component{

    render() {
        return (
            <div>
                <Panel header="Pokémon" bsStyle="primary">
                    <p>Pokémon are creatures of all shapes and sizes who live in the wild or alongside humans. For
                        the most part, Pokémon do not speak except to utter their names. Pokémon are raised and
                        commanded by their owners (called “Trainers”). During their adventures, Pokémon grow and
                        become more experienced and even, on occasion, evolve into stronger Pokémon. There are
                        currently more than 700 creatures that inhabit the Pokémon universe.</p>
                    <p><Link className="btn btn-primary" to={'/pokemon/page/0'}>Read More...</Link></p>
                </Panel>
                <Panel header="Berries" bsStyle="primary">
                    <p>Berries are small, juicy, fleshy fruit. As in the real world, a large
                        variety exists in the Pokémon world, with a large range of flavors, names, and effects.
                        First found in the Generation II games, many Berries have since become critical held items
                        in battle, where their various effects include HP and status condition restoration, stat
                        enhancement, and even damage negation.</p>
                    <p><Link className="btn btn-primary" to={'/berries/page/0'}>Read More...</Link></p>
                </Panel>
                <Panel header="Machines" bsStyle="primary">
                    <p>Machines are the representation of items that teach moves to Pokémon. They vary from version
                        to version, so it is not certain that one specific TM or HM corresponds to a single
                        Machine.</p>
                    <p><Link className="btn btn-primary" to={'/machines/page/0'}>Read More...</Link></p>
                </Panel>
            </div>
        );
    }
}

export default Home;