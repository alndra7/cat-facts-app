import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Card from "./Card";
import { getAPI } from "../slices/dataSlice";

import "./SetOfCards.scss";
import likeIcon from './../icons/liked.svg'

function SetOfCards() {

    const { facts, loaded } = useSelector((state) => state.data);
    const [liked, showLiked] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loaded) {
            dispatch(getAPI());
        }
    }, [])

    const handleClick = () => {
        if (!liked) {
            showLiked(true)
        } else {
            showLiked(false)
        }
    }

    return (
        <div className="cards__wrapper">
            <div>
                <button className="cards__show-like-btn" onClick={handleClick}>
                    <img src={likeIcon} alt="иконка сердца" />
                </button>
            </div>

            {!liked ?
                <div className="cards__container">
                    {facts.map((fact) => {
                        return <Card {...fact} text={fact.text} key={fact._id} />;
                    })}
                </div>
                :
                <div className="cards__container">
                    {facts.map((fact) =>
                        fact.like ? (
                            <Card {...fact} text={fact.text} key={fact._id} />
                        ) : (
                            <div className="cards__empty-card" key={crypto.randomUUID()} ></div>
                        )
                    )}
                </div>}
        </div>

    )
}

export default SetOfCards;