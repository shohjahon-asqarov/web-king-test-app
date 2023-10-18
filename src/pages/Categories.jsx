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

const Categories = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div className='container pt-10'>
            <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {questions && questions.map((i, index) => {
                    return (
                        <li className='p-8 rounded-3xl cursor-pointer bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]' key={index}>
                            <p><i className='bi bi-person'></i> {i.owner.name ? i.owner.name : 'No Author'}</p>
                            <p className='uppercase italic text-2xl font-semibold text-[#ff794d]'>
                                <i className="bi bi-award-fill mr-2 text-base"></i>
                                {i.owner.theme}
                            </p>
                            <p>
                                <i className="bi bi-pencil-fill mr-2"></i>
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
    )
}

export default Categories