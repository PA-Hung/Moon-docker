import React from 'react'
import { Route, Routes } from "react-router-dom";
import Admin from '../Admin/Admin'
import HomePage from '../Home/HomePage'
import App from '../../App'
import ManageUser from '../Admin/Content/UserManager/ManageUser';
import DashBoard from '../Admin/Content/DashBoard/DashBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../Auth/Login';
import ListQuiz from '../QuizContent/ListQuiz';
import DetailQuiz from '../QuizContent/DetailQuiz';
import NotFoundPage from '../Home/NotFoundPage';
import QuizManager from '../Admin/Content/QuizManager/QuizManager';
import QuestionManager from '../Admin/Content/QuestionManager/QuestionManager';
import AssignQuiz from '../Admin/Content/QuizManager/AssignQuiz';
import QAUpdate from '../Admin/Content/QuestionManager/QAUpdate';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element={
                        <PrivateRoutes>
                            <ListQuiz />
                        </PrivateRoutes>}
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <PrivateRoutes>
                        <Admin />
                    </PrivateRoutes>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="user-manager" element={<ManageUser />} />
                    <Route path="quiz-manager" element={<QuizManager />} />
                    <Route path="question-manager" element={<QuestionManager />} />
                    <Route path="assign-to-student" element={<AssignQuiz />} />
                    <Route path="qa-update" element={<QAUpdate />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes >
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default AppRoutes