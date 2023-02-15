import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Drawer, Form, Row, Input, Col, Space, Button } from "antd"
import "./FirmCreate.css"
import { useDispatch } from "react-redux"
import { addFirm } from "@/redux/actions"

const { TextArea } = Input

const firmValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
})

function FirmCreate({ onClose, drawerVisible }) {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      dispatch(addFirm(values, onClose))
    },
    validationSchema: firmValidationSchema,
  })

  const { errors, touched, handleSubmit, handleChange, values } = formik

  return (
    <Drawer
      title="Create Firm"
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
      visible={drawerVisible}
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
            <Form.Item
              label="Description:"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <TextArea
                rows={6}
                name="description"
                {...formik.getFieldProps("description")}
                onChange={handleChange}
                value={values.description}
              />
              {touched?.description && errors?.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default FirmCreate
