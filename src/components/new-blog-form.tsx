import { Form, Button, Input, Icon, Divider } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Blog, User } from '../constants/types';
import { postBlog } from '../api';
import { setUser } from '../store/actions';
import { userInfo } from 'os';

export interface NewBlogFormProps extends FormComponentProps {
  user: User;
  dispatch: any;
}

interface IState {
  showForm: boolean;
}

let id = 0;

class NewBlogForm extends React.Component<NewBlogFormProps & RouteComponentProps, IState> {
  constructor(props: NewBlogFormProps & RouteComponentProps) {
    super(props);
    this.state = { showForm: false };
  }

  remove = (k : any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key : any) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
          const blog : Blog = {
              name : values.name,
              username : this.props.user.username,
              content : values.content,
              tags : values.tags,
              date : 0,
          }
        console.log(blog);
        const posted = postBlog(blog)

        console.log("POSTED RESULT: ", posted);

        const updated_user = { ...this.props.user };
        updated_user.blogs.push(blog)
        this.props.dispatch(setUser(updated_user));
        this.setState({ showForm: false });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k : any, index : any) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Tags' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`tags[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input blogs tags or delete this field.",
            },
          ],
        })(<Input placeholder="tag name" style={{ width: '60%'}} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return this.state.showForm ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='Blog name'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name of the garden!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='content'>{getFieldDecorator('content', {
            rules: [{ required: true, message: 'Input the content of your blog!' }],
          })(<Input />)}
        </Form.Item>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add tag
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create Blog
          </Button>
        </Form.Item>
      </Form>
    ) : (
        <div>
        <div className='gardens-add-button'>
        <Button
          type='primary'
          shape='round'
          icon='plus'
          size='default'
          onClick={() => {
            this.setState({ showForm: true });
          }}>
          Add Blog
        </Button>
        </div>
        <Divider/>
        </div>
    );
  }
}

export const ConnectedNewBlogForm = connect()(withRouter(NewBlogForm));
