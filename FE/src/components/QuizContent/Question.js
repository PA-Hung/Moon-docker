import React, { useState } from 'react'
import _ from 'lodash'
import { Buffer } from 'buffer';
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const [isPreviewImg, setIsPreviewImg] = useState(false)
    const { data, currentQuiz, handleCheckboxParent } = props
    if (_.isEmpty(data)) {
        return (<></>)
    }
    const base64String = Buffer.from(data.image ? data.image : '').toString('base64');
    const handleCheckboxChild = (aID, qID) => {
        handleCheckboxParent(aID, qID)
    }

    return (
        <>
            {base64String ?
                <div className='image-question'>
                    <img style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64,${base64String}`}
                        alt='img-question'
                        onClick={() => setIsPreviewImg(true)} />
                    {isPreviewImg === true && <Lightbox
                        image={`data:image/jpeg;base64,${base64String}`}
                        title={'Question-image'}
                        onClose={() => setIsPreviewImg(false)}
                    />}
                </div> :
                <div className='image-question'></div>
            }
            <div className='question'>Question {currentQuiz + 1} : {data.description}</div>
            <div className='answer'>
                {data.QuizAnswers && data.QuizAnswers.length > 0 && data.QuizAnswers.map((item, index) => {
                    return (
                        <div key={`index-answer${index}`} className='a-child'>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    checked={item.isSelected ? item.isSelected : ''}
                                    onChange={() => handleCheckboxChild(item.id, data.id)} />
                                <label className="form-check-label" >
                                    {item.description}
                                </label>
                            </div>
                        </div>
                    )
                })}


            </div>
        </>
    )
}

export default Question