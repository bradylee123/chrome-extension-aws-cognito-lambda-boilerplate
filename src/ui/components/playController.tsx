import * as React from "react";

import "../../styles/playController.css";

const playController = props => {

    return (
        <div>
        	<section className="playControls__inner">
        		<div className="playControls__wrapper">
        			<div className="playControls__elements">
        				<button className="playControls__control" onClick={() => props.previous()}>
        					<img src="../images/icon_previous.svg" />
        				</button>
                        {(!props.playing) &&
                            <button className="playControls__control" onClick={() => props.playSong(true)}>
                                <img src="../images/icon_play.svg" />
                            </button>
                        }
                        {(props.playing) &&
                            <button className="playControls__control" onClick={() => props.playSong(false)}>
                                <img src="../images/icon_pause.svg" />
                            </button>
                        }
        				<button className="playControls__control" onClick={() => props.next()}>
        					<img src="../images/icon_next.svg" />
        				</button>
        			</div>
        		</div>
        	</section>
        </div>
    )

}


export default playController;