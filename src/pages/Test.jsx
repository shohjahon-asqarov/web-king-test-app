import { Progress, Result } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Test = () => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [myAnswers, setMyAnswers] = useState([])
    const [finish, setFinish] = useState(false)

    const { questions } = useSelector((state) => state.questions)

    let currentQuestion
    if (questions.length !== 0) {
        currentQuestion = questions.questions[index]
    }

    const nextQuestion = (correctIndex) => {
        if (currentQuestion) {
            setIndex(index + 1)
            const currentResult = {
                question: currentQuestion.question,
                my_answer: currentQuestion.answers[correctIndex],
                correct_answer: currentQuestion.answers[currentQuestion.correct_answer-1]
            }
            console.log(currentResult);
            setMyAnswers(myAnswers => [...myAnswers, currentResult])
        } else {
            setFinish(true)
        }
    }

    const checkCorrect = (arr) => {
        let result = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].my_answer === arr[i].correct_answer) {
                result++
            }
        }
        return result
    }

    return (
        <section className='container py-20'>
            {questions.length !== 0 ?
                <div>
                    {!finish && currentQuestion && questions ?
                        <ul className='space-y-5 mx-auto'>
                            <li className='p-5 sm:p-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]' key={currentQuestion.id}>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xl border-b pb-4'>{index + 1}) {currentQuestion.question}</h3>
                                    <span className='font-bold'>{index + 1}/10</span>
                                </div>
                                <div className='space-y-5 flex flex-col'>
                                    {currentQuestion.answers.map((answer, index) => {
                                        return (
                                            <button data-aos='fade-left' onClick={() => nextQuestion(index)} className='bg-white py-3.5 px-5 group rounded-lg cursor-pointer hover:bg-slate-200 active:bg-green-200 text-left duration-300 flex justify-between ' key={index}>
                                                {answer}
                                                <i className='bi bi-check hidden group-hover:flex bg-green-600 rounded-full w-5 h-5 justify-center items-center text-white'></i>
                                            </button>
                                        )
                                    })}
                                </div>
                                <Progress percent={(index) * 10} showInfo={false} />
                            </li>
                        </ul>
                        :
                        <ul ul className='space-y-5'>
                            {myAnswers.map((i, index) => {
                                return (
                                    <li className='p-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]' key={index}>
                                        <h3 data-aos="fade-up" className='text-xl border-b pb-4'>{index + 1}) {i.question}</h3>
                                        {i.my_answer === i.correct_answer
                                            ? <ul>
                                                <li data-aos="fade-up" className='space-x-2 text-green-600'>
                                                    <i className='bi bi-check mr-2'></i>
                                                    To'g'ri javob berdingiz:
                                                    <span> {i.my_answer}</span>
                                                </li>
                                            </ul>
                                            : <ul className='space-y-5'>
                                                <li data-aos="fade-up" className='space-x-2 text-red-600'>
                                                    <i className='bi bi-x mr-2'></i>
                                                    Sizning javobingiz:
                                                    <span>{i.my_answer}</span>
                                                </li>
                                                <li data-aos="fade-up" className='space-x-2 text-green-600'>
                                                    <i className='bi bi-check mr-2'></i>
                                                    To'g'ri javob:
                                                    <span>{i.correct_answer}</span>
                                                </li>
                                            </ul>
                                        }
                                    </li>
                                )
                            })}

                            <ul>
                                <li className='p-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]'>
                                    <h3 data-aos="fade-up" className='text-xl border-b pb-4'>Natija</h3>
                                    <div className='flex flex-col space-y-5 sm:flex-row sm:items-center sm:justify-between'>
                                        <ul className='space-y-4'>
                                            <li data-aos="fade-up" className='text-green-600'>
                                                <i className='bi bi-check mr-2'></i>
                                                To'g'ri javoblar: {checkCorrect(myAnswers)} ta
                                            </li>
                                            <li data-aos="fade-up" className='text-red-600'>
                                                <i className='bi bi-x mr-2'></i>
                                                Noto'g'ri javoblar: {myAnswers.length - checkCorrect(myAnswers)} ta
                                            </li>
                                            <li data-aos="fade-up">
                                                <i className='bi bi-question mr-2'></i>
                                                Jami savollar: {myAnswers.length} ta
                                            </li>
                                        </ul>
                                        <Progress data-aos="fade-up" className='mx-auto' type="circle" percent={checkCorrect(myAnswers) * 10} />

                                    </div>

                                    <div className='border-t pt-4'>
                                        <button onClick={() => navigate('/')} className="btn-blue">Ortga</button>
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    }
                </div>
                : <Result
                    status="warning"
                    title="Qamdaydur muammo yuzaga keldi ortga qayting!"
                    extra={
                        <button onClick={() => navigate('/')} className='btn-blue'>
                            Ortga qaytish
                        </button>
                    }
                />
            }
        </section >
    )
}

export default Test