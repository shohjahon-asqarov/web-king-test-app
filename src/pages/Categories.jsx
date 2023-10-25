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
import { Empty, Select } from 'antd';

const Categories = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)

    const [questions, setQuestions] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('All')

    const fetchData = async () => {
        const q = query(collection(db, 'questions'));
        onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
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

    const changeCategory = (value) => {
        setSelectedCategory(value)
    };

    const found = questions.find(question => question.owner.category === selectedCategory)

    return (
        <div className='container pb-16'>
            {
                loader
                    ? <Loader />
                    : <div>
                        <h2 className='text-center py-10 text-3xl font-semibold'>Testlar</h2>

                        <div className='mb-10 flex justify-between items-center'>
                            <h2 className='text-xl md:text-3xl font-semibold'>Filter</h2>
                            <Select
                                defaultValue="All"
                                style={{
                                    width: 120,
                                }}
                                onChange={changeCategory}
                                options={[
                                    {
                                        value: 'All',
                                        label: 'Barchasi',
                                    },
                                    {
                                        value: 'English',
                                        label: 'English',
                                    },
                                    {
                                        value: 'Front-end',
                                        label: 'Front-end',
                                    },
                                    {
                                        value: 'Backend',
                                        label: 'Back-end',
                                    },
                                ]}
                            />
                        </div>

                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {questions && questions.map((i, index) => {
                                return (
                                    <li className={`p-7 rounded-3xl cursor-pointer bg-card-bg border border-[hsla(0,0%,87.5%,.7)] text-[rgba(2,11,18,.7)] hover:bg-slate-200 !transition-colors duration-300 ${i.owner.category === selectedCategory || selectedCategory === 'All' ? 'inline-block' : 'hidden'}`} key={index}>
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
                                                {i.owner.added_time}
                                            </span>
                                            <button onClick={() => startTest(i)} className='btn-card'>
                                                <i className='bi bi-arrow-right'></i>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {!found && selectedCategory !== 'All' && <Empty description='Test mavjud emas' />}
                    </div>
            }
        </div>
    )
}

export default Categories