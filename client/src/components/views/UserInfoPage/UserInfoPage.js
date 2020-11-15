import React, {useEffect} from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import axios from 'axios';

import {
  Form,
  Input,
  Button,
  Tooltip,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function UserInfoPage(props) {
  const dispatch = useDispatch();
  // console.log(props);
  let userInfo = {}
  if (props.user.userData) {
    userInfo = props.user.userData;
  }
  const handleCancel = () => {
    props.history.push("/");
  }
  return (

    <Formik
      enableReinitialize={true}
      initialValues={{
        email: userInfo ? userInfo.email: '',
        // lastName: '',
        name: userInfo ? userInfo.name : '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름을 입력해주세요.'),
        // lastName: Yup.string()
        //   .required('Last Name is required'),
        email: Yup.string()
          .email('올바른 이메일 형식이 아닙니다.')
          .required('이메일은 필수입력 항목입니다.'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6글자 이상 입력해주세요.')
          .required('비밀번호를 입력해주세요.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '위에서 설정한 비밀번호와 일치해야합니다.')
          .required('비밀번호를 다시 한 번 입력해주세요.')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            // lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };
          console.log('dataTOSUBMIT', dataToSubmit);

          dispatch(updateUser(dataToSubmit)).then(response => {
            if (response.payload.updateSuccess) {
              props.history.push("/");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>회원정보</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
              {/* 이름 입력란 */}
              <Form.Item required label="성명">
                <Input
                  id="name"
                  placeholder="이름을 입력해주세요."
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              {/* 이메일 입력란 */}
              <Form.Item required label={<span> 이메일 주소&nbsp;
                <Tooltip title="이메일은 수정이 불가합니다.">
                  <QuestionCircleOutlined />
                </Tooltip></span>} hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  type="email"
                  disabled
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {/* <Button>중복확인</Button> */}
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>
              {/* 비번 입력란 */}
              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호를 6자 이상 입력해주세요."
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              {/* 비번 확인입력 란 */}
              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              {/* 회원정보 수정 버튼 */}
              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  수정하기
                </Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={handleCancel} type="danger" disabled={isSubmitting}>
                  뒤로가기
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default UserInfoPage
