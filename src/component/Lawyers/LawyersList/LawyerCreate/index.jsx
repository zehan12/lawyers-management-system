import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Select,
  Drawer,
  Form,
  Row,
  Input,
  Col,
  Space,
  Button,
  InputNumber,
} from "antd"
// import "./FirmCreate.css"
import { useDispatch } from "react-redux"
import { addLawyer } from "@/redux/actions"
import { useParams } from "react-router-dom"

const { Option } = Select
// import { addFirm } from "@/redux/actions"

const firmValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  speciality: Yup.array().of(Yup.string()),
  startTime: Yup.number().integer().min(0).max(23),
  endTime: Yup.number().integer().moreThan(Yup.ref("startTime")).min(1).max(24),
  cost: Yup.number().required(),
})

const hours = []

for (let i = 1; i <= 23; i += 1) {
  hours.push(<Option key={i} value={i}>{`${i}:00`}</Option>)
}

function LawyerCreate({ onClose, visible }) {
  const dispatch = useDispatch()
  const { firmId } = useParams()

  const formik = useFormik({
    initialValues: {
      name: "",
      speciality: [],
      startTime: 0,
      endTime: 1,
      cost: 0,
    },
    onSubmit: (values) => {
      const { name, speciality, startTime, endTime, cost } = values
      const lawyer = {
        name,
        speciality,
        availablity: {
          startTime,
          endTime,
        },
        cost,
      }

      dispatch(addLawyer(firmId, lawyer, onClose))
    },
    validationSchema: firmValidationSchema,
  })

  const { errors, touched, handleSubmit, handleChange, values } = formik

  return (
    <Drawer
      title="Create Lawer"
      placement="right"
      closable={false}
      size="large"
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: "absolute" }}
    >
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                name="name"
                {...formik.getFieldProps("name")}
                onChange={handleChange}
                value={values.name}
              />
              {touched?.name && errors?.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Speciality:">
              <Select
                {...formik.getFieldProps("speciality")}
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder="Tags Mode"
                onChange={(value) => formik.setFieldValue("speciality", value)}
                value={values.speciality}
              >
                <Option value="divorce_lawyer" key="divorce_lawyer">
                  divorce lawyer
                </Option>
                <Option value="criminal_lawyer" key="criminal_lawyer">
                  criminal lawyer
                </Option>
                <Option value="property_lawyer" key="property_lawyer">
                  property lawyer
                </Option>
              </Select>
              {touched?.speciality && errors?.speciality && (
                <div className="error-message">{errors.speciality}</div>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Availibity Start Time:"
              rules={[
                {
                  required: true,
                  message: "Please select start time",
                },
              ]}
            >
              <Select
                {...formik.getFieldProps("startTime")}
                style={{
                  width: "100%",
                }}
                onChange={(value) => formik.setFieldValue("startTime", value)}
                value={values.startTime}
              >
                <Option key="0" value={0}>
                  0:01
                </Option>
                {hours}
                {touched?.startTime && errors?.startTime && (
                  <div className="error-message">{errors.startTime}</div>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Availibity End Time:"
              rules={[
                {
                  required: true,
                  message: "Please select End time!",
                },
              ]}
            >
              <Select
                {...formik.getFieldProps("endTime")}
                style={{
                  width: "100%",
                }}
                onChange={(value) => formik.setFieldValue("endTime", value)}
                value={values.endTime}
              >
                {hours}
                <Option key="24" value="24">
                  23:59
                </Option>
              </Select>
              {touched?.endTime && errors?.endTime && (
                <div className="error-message">{errors.endTime}</div>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Cost:"
              rules={[
                {
                  required: true,
                  message: "Please select Cost per Hour!",
                },
              ]}
            >
              <InputNumber
                {...formik.getFieldProps("cost")}
                addonBefore="₹"
                min={0}
                value={values.cost}
                onChange={(value) => formik.setFieldValue("cost", value)}
              />

              {touched?.cost && errors?.cost && (
                <div className="error-message">{errors.cost}</div>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default LawyerCreate
