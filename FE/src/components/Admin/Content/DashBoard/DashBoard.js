import React, { useEffect, useState } from 'react'
import './DashBoard.scss'
import { ResponsiveContainer, BarChart, Tooltip, Legend, Bar, XAxis, YAxis } from 'recharts';
import { getDataOverView } from '../../../../services/adminApiService'

const DashBoard = () => {
    const [dataOverView, setDataOverView] = useState([])
    const [dataChart, setDataChart] = useState([])

    const fetchDataOverView = async () => {
        let res = await getDataOverView()
        if (res && res.EC === 0) {
            setDataOverView(res.DT)
            let Us = 0, Qz = 0, Qs = 0, As = 0
            Us = res?.DT?.userCount ?? 0;
            Qz = res?.DT?.quizCount ?? 0;
            Qs = res?.DT?.questionCount ?? 0;
            As = res?.DT?.answerCount ?? 0;
            const data = [
                {
                    "name": "Users",
                    "User": Us,
                },
                {
                    "name": "Quizzes",
                    "Quizs": Qz,
                },
                {
                    "name": "Questions",
                    "Questions": Qs,
                },
                {
                    "name": "Answers",
                    "Answers": As,
                }
            ]
            setDataChart(data)
        }
    }

    useEffect(() => {
        fetchDataOverView()
    }, [])

    //console.log('>>>>>>>>data overview', dataOverView);
    return (
        <div className='dashboard-container'>
            <div className='left-content'>
                <div className='chart-content'>
                    <span className='title1'>Total user</span>
                    <span className='total-user'>
                        {dataOverView && dataOverView.userCount ? <>{dataOverView.userCount}</> : <>0</>}
                    </span>
                </div>
                <div className='chart-content'>
                    <span className='title1'>Total Quizzes</span>
                    <span className='total-quizs'>
                        {dataOverView && dataOverView.quizCount ? <>{dataOverView.quizCount}</> : <>0</>}
                    </span>
                </div>
                <div className='chart-content'>
                    <span className='title1'>Total Questions</span>
                    <span className='total-questions'>
                        {dataOverView && dataOverView.questionCount ? <>{dataOverView.questionCount}</> : <>0</>}
                    </span>
                </div>
                <div className='chart-content'>
                    <span className='title1'>Total Answers</span>
                    <span className='total-answers'>
                        {dataOverView && dataOverView.answerCount ? <>{dataOverView.answerCount}</> : <>0</>}
                    </span>
                </div>
            </div>
            <div className='right-content'>
                <ResponsiveContainer width="95%" height={"100%"}>
                    <BarChart data={dataChart}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="User" fill="#8884d8" />
                        <Bar dataKey="Quizs" fill="#82ca9d" />
                        <Bar dataKey="Questions" fill="#ed3434" />
                        <Bar dataKey="Answers" fill="#fcb12a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DashBoard