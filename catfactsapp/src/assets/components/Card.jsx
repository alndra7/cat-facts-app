import { useDispatch } from 'react-redux';
import { deleteCard, likeCard } from "../slices/dataSlice";

import './Card.scss';
import pawIcon from './../../assets/icons/paw.svg'
import x_mark from './../../assets/icons/xmark.svg'
import liked from "./../../assets/icons/liked.svg"
import not_liked from "./../../assets/icons/notLiked.svg"

function Card(props) {

    const dispatch = useDispatch();
    return (
        <div className="card__container">
            <img src={pawIcon} alt="иконка лапы" />

            <div>{props.text}</div>

            <div className="card__btn-container">

                <button className='card__like-btn' onClick={() => dispatch(likeCard(props._id))}>
                    <img src={props.like ? liked : not_liked} alt="иконка сердца" />
                </button>

                <button className="card__delete-btn" onClick={() => dispatch(deleteCard(props._id))}>
                    <img src={x_mark} alt="иконка удаления" />
                </button>
            </div>

        </div>
    )
}

export default Card;