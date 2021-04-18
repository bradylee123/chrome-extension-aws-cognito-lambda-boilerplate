import * as React from "react";

const navigator = props => {

    const [activeId, setActiveId] = React.useState("player");

    const handleSelectTab = id => {
        setActiveId(id);
        props.handleSelectTab(id);
    }

    return (

        <div id="footer">
            <div className="footer-tab">
                <a className={activeId === "player" ? "iconContainer iconContainerActive" : "iconContainer"} onClick={() => handleSelectTab("player")}>
                <img className="footer-img" src="../images/icon_music_player.svg" />
                </a>
            </div>
            <div className="footer-tab">
                <a className={activeId === "history" ? "iconContainer iconContainerActive" : "iconContainer"} onClick={() => handleSelectTab("history")}>
                <img className="footer-img" src="../images/icon_playlist_play.svg" />
                </a>
            </div>
            <div className="footer-tab">
                <a className={activeId === "account" ? "iconContainer iconContainerActive" : "iconContainer"} onClick={() => handleSelectTab("account")}>
                <img className="footer-img" src="../images/icon_user.svg" />
                </a>
            </div>
        </div>
    )

}

export default navigator;