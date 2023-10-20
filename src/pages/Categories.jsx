import {
    query,
    collection,
    onSnapshot,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../api/firebase';
import { useDispatch } from 'react-redux';
import { setQuestionsState } from '../store/slices/questionsSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Categories = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)

    const [questions, setQuestions] = useState([])

    const fetchData = async () => {
        const q = query(collection(db, 'questions'));
        onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
            console.log(todosArr);
            setQuestions(todosArr);
            setLoader(false)
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const startTest = (questions) => {
        dispatch(setQuestionsState(questions))
        navigate('/test')
    }

    return (
        <div className='container pb-16'>
            {
                loader
                    ? <Loader />
                    : <div>
                        <h1 className='text-center py-10 text-3xl font-semibold'>Testlar</h1>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {questions && questions.map((i, index) => {
                                return (
                                    <li data-aos='fade-up' className='p-7 rounded-3xl cursor-pointer bg-card-bg border border-[hsla(0,0%,87.5%,.7)] text-[rgba(2,11,18,.7)]' key={index}>
                                        <p className='mb-3'><i className='bi bi-person mr-2'></i> {i.owner.name ? i.owner.name : 'No Author'}</p>
                                        <h3 className='uppercase mb-3 text-xl font-bold !text-[#289C8E]'>
                                            <i className="bi bi-award mr-2 text-base"></i>
                                            {i.owner.theme}
                                        </h3>
                                        <p className='mb-7'>
                                            <i className="bi bi-pencil mr-2"></i>
                                            {i.owner.category}
                                        </p>
                                        <div className='flex justify-between items-center'>
                                            <span>
                                                <i className='bi bi-calendar mr-2'></i>
                                                18.10.2023
                                            </span>
                                            <button onClick={() => startTest(i)} className='btn-card'>
                                                <i className='bi bi-arrow-right'></i>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
            }
        </div>
    )
}

export default Categories