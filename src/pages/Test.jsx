import { Input, Modal, Progress, Result } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Test = () => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [myAnswers, setMyAnswers] = useState([])
    const [finish, setFinish] = useState(false)

    const nameRef = useRef()
    const usernameRef = useRef()

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const { questions } = useSelector((state) => state.questions)

    let currentQuestion
    if (questions.length !== 0) {
        currentQuestion = questions.questions[index]
    }

    const nextQuestion = (correctIndex) => {
        setRunning(true)
        if (currentQuestion) {
            setIndex(index + 1)
            const currentResult = {
                question: currentQuestion.question,
                my_answer: currentQuestion.answers[correctIndex],
                correct_answer: currentQuestion.answers[currentQuestion.correct_answer - 1]
            }
            setMyAnswers(myAnswers => [...myAnswers, currentResult])
            if (myAnswers.length === 9) {
                setRunning(false)
            }
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        // result sent to telegram 
        const minut = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
        const secund = ("0" + Math.floor((time / 1000) % 60)).slice(-2)

        let text = `✏️Mavzu: ${questions.owner.theme}%0A👤Ismi familiya: ${nameRef.current.input.value}%0A📱Telegram: @${usernameRef.current.input.value}%0A⏰Sarflangan vaqt: ${minut}:${secund}%0A✅To'g'ri javoblar: ${checkCorrect(myAnswers)} ta / ${10 * checkCorrect(myAnswers)}%%0A❌Noto'g'ri javoblar: ${myAnswers.length - checkCorrect(myAnswers)} ta%0A❔Jami savollar: 10 ta`

        const token = "6456033575:AAFmRkIbmEwJ5RbCuc6UrP-EK42V_Zbyzvs";
        let url = "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=-1001995880798&text=";
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url + `${text}`, true);
        xhttp.send();

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <section className='container py-20'>
            {questions.length !== 0 ?
                <div>
                    {!finish && currentQuestion && questions ?
                        <ul className='space-y-5 mx-auto'>
                            <li className='p-5 py-12 sm:px-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)] relative overflow-hidden' key={currentQuestion.id}>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-lg sm:text-xl font-semibold border-b pb-4 w-full animation-show'>{index + 1} / 10) {currentQuestion.question}</h3>
                                </div>

                                <div className='space-y-5 flex flex-col'>
                                    {currentQuestion.answers.map((answer, index) => {
                                        return (
                                            <button onClick={() => nextQuestion(index)} className='bg-white py-3.5 px-5 group rounded-xl cursor-pointer active:bg-[#289C8E] active:text-white text-left duration-300 flex justify-between border-2 sm:hover:border-[#289C8E] animation-show' key={index}>
                                                <div>
                                                    <span className='font-medium'>
                                                        {index === 0 && 'A) '}
                                                        {index === 1 && 'B) '}
                                                        {index === 2 && 'C) '}
                                                        {index === 3 && 'D) '}
                                                    </span>
                                                    {answer}
                                                </div>
                                                <i className='bi bi-check hidden group-active:flex sm:group-hover:flex bg-[#289C8E] rounded-full w-5 h-5 justify-center items-center text-white'></i>
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="flex justify-end">
                                    <div className="numbers">
                                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                    </div>
                                </div>

                                <Progress className='progress' percent={(index) * 10} showInfo={false} />
                            </li>
                        </ul>
                        :
                        <ul ul className='space-y-5'>
                            <ul>
                                <li className='p-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]'>
                                    <h2 className='text-2xl border-b pb-4 font-semibold'>Sizning natijangiz</h2>
                                    <div className='flex flex-col space-y-5 sm:flex-row sm:items-center sm:justify-between'>
                                        <ul className='space-y-4'>
                                            <li className='text-[#289C8E]'>
                                                <i className='bi bi-check mr-2'></i>
                                                <span className="font-medium">To'g'ri javoblar: </span>
                                                {checkCorrect(myAnswers)} ta
                                            </li>
                                            <li className='text-red-600'>
                                                <i className='bi bi-x mr-2'></i>
                                                <span className="font-medium">Noto'g'ri javoblar: </span>  {myAnswers.length - checkCorrect(myAnswers)} ta
                                            </li>
                                            <li>
                                                <i className='bi bi-question mr-2'></i>
                                                <span className="font-semibold">Jami savollar: </span>
                                                {myAnswers.length} ta
                                            </li>
                                            <li className='flex'>
                                                <i className='bi bi-clock mr-2'></i>
                                                <span className='font-semibold'>Sarflangan vaqt: </span>
                                                <div className="ml-2">
                                                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <Progress className='mx-auto circle-progress' type="circle" percent={checkCorrect(myAnswers) * 10} />
                                    </div>

                                    <div className='border-t pt-4 flex space-x-5'>
                                        <button onClick={() => navigate('/category')} className="btn-blue">
                                            Ortga
                                        </button>
                                        <button onClick={showModal} className="btn-blue bg-[#229ED9]">
                                            Ulashish
                                            <i className='bi bi-telegram ml-2'></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            {myAnswers.map((i, index) => {
                                return (
                                    <li data-aos='fade-left' className='p-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]' key={index}>
                                        <h3 className='text-xl font-semibold border-b pb-4'>{index + 1}) {i.question}</h3>
                                        {i.my_answer === i.correct_answer
                                            ? <ul>
                                                <li className='space-x-2 text-[#289C8E] font-medium'>
                                                    <i className='bi bi-check mr-2'></i>
                                                    To'g'ri javob berdingiz:
                                                    <span> {i.my_answer}</span>
                                                </li>
                                            </ul>
                                            : <ul className='space-y-5'>
                                                <li className='space-x-2 text-red-600 font-medium'>
                                                    <i className='bi bi-x mr-2'></i>
                                                    Sizning javobingiz:
                                                    <span>{i.my_answer}</span>
                                                </li>
                                                <li className='space-x-2 text-[#289C8E] font-medium'>
                                                    <i className='bi bi-check mr-2'></i>
                                                    To'g'ri javob:
                                                    <span>{i.correct_answer}</span>
                                                </li>
                                            </ul>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>
                : <Result
                    status="warning"
                    title="Qamdaydur muammo yuzaga keldi ortga qayting!"
                    extra={
                        <button onClick={() => navigate(-1)} className='btn-blue'>
                            Ortga qaytish
                        </button>
                    }
                />
            }

            <Modal title="Telegramga ulashish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='space-y-4 py-8'>
                    <Input ref={nameRef} className='py-1.5 input' size='large' prefix={<i className='bi bi-person'></i>} placeholder='Ism familiyangiz' />
                    <Input ref={usernameRef} className='py-1.5 input' size='large' prefix={<i className='bi bi-telegram'></i>} placeholder='Telegram usename' />
                </div>
            </Modal>
        </section >
    )
}

export default Test