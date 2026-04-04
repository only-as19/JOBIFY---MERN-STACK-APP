  import { FormRow, SubmitBtn } from '../components';
  import Wrapper from '../assets/wrappers/DashboardFormPage';
  import { useOutletContext } from 'react-router-dom';
  import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
  import { Form, redirect } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import { FormRowSelect } from '../components';
  import customFetch from '../utils/customFetch';

  export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/jobs', data)
      toast.success('Successfully created')
      return redirect('all-jobs')
    } catch (error) {
      console.log(error);
      
      toast.error(error?.response?.data?.msg);
      return error
    }
  }


  const AddJob = () => {
    const { user } = useOutletContext();
    return (
      <Wrapper>
        <Form method='post' className='form'>
          <h4 className='form-title'>Add job</h4>
          <div className='form-center'>
            <FormRow name='position' type='text' />
            <FormRow name='company' type='text' />
            <FormRow
              name='jobLocation'
              labelText='job location'
              type='text'
              defaultValue={user.location}
            />
            <FormRowSelect name='jobStatus' labelText='job Status' defaultValue={ JOB_STATUS.PENDING } list={Object.values(JOB_STATUS)} />
            <FormRowSelect name='jobType' labelText='job type' defaultValue={ JOB_TYPE.FULL_TIME } list={Object.values(JOB_TYPE)} />
              <SubmitBtn formBtn/>
          </div>
        </Form>
      </Wrapper>
    );
  };
  export default AddJob;
