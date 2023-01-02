import React, { useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Link from 'next/link';

import "react-phone-number-input/style.css";

enum GenderEnum {
    female = "Female",
    male = "Male",
    non_binary = "Non-binary",
    prefer_not_to_say = "Prefer not to say",
}

enum YearEnum {
    freshman = "Freshman",
    sophomore = "Sophomore",
    junior = "Junior",
    senior = "Senior",
    fifth = "5th Year",
    sixth = "6th Year",
    masters = "Masters",
    other = "Other"
}

enum MajorEnum {
    csci = "Computer Science",
    csee = "Computer Systems Engineering",
    ds = "Data Science",
    fina = "Finance",
    mist = "Management Information System",
    ecse = "Electrical Engineering",
    mche = "Mechanical Engineering",
    undecided = "Undecided",
    other = "Other",
}

enum SizeEnum {
    small = "Small",
    medium = "Medium",
    large = "Large",
    xlarge = "X-Large",
    xxlarge = "XX-Large"
}

enum Participated {
    yes = "YES",
    no = "NO"
}

interface Country {
    value: string; // country code
    label: string; // Full country name
}

interface School {
    value: string;
    label: string;
}

interface RegisterForm {
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    age: number;
    phoneNumber: string; // Worry about validation with '-' 
    countryResidence: Country;
    year: YearEnum;
    major: MajorEnum;
    inputMajor: string;
    minor: string;
    school: School;
    inputSchool: string;
    email: string; // .edu
    participated: boolean; // Have you ever participated in a hackathon? Yes or No
    hopeToSee: string; // What do you hope to see from UGA Hacks 8?
    dietaryRestrictions: string; // Vegetarian, etc : Should give options
    shirtSize: SizeEnum; // S, M, L, XL, XXL, should be enum
    codeOfConduct: boolean; // MLH Code of COnduct: I have agreed , YES OR NO
    eventLogisticsInfo: boolean; // Yes
    mlhCommunication: boolean; // Yes
    // excitement: Number; // Scale of 1- 100
}

export default function register() {
  const { control, resetField, watch, register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: {
        countryResidence: {value: "", label: ""},
        phoneNumber: "",
        inputMajor: "",
    }
  });
  const onSubmit: SubmitHandler<RegisterForm> = data => console.log(data);
  const watchers = watch(["major", "school", "participated"]); // you can also target specific fields by their names
  //const debug = watch();
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const schoolOptions = [
    {value: "uga", label: "University of Georgia"},
    {value: "gt", label: "Georgia Tech"},
    {value: "georgia-state", label: "Georgia State"},
    {value: "georgia-college", label: "Georgia College"},
    {value: "ucf", label: "University of Central Florida"},
    {value: "stanford", label: "Stanford University"},
    {value: "other", label: "Other"},
  ]
  const [otherMajor, setOtherMajor] = useState(false)
  const [otherSchool, setOtherSchool] = useState(false)

  register("major", {
    onChange: (e) => otherMajorInput(e.target.value)
  })

  register("school", {
    onChange: (e) => otherSchoolInput(e.target.value.value)
  })

  function otherMajorInput(value: string) {
    console.log(value)
    if(value == "other") {
      setOtherMajor(true)
    } else {
      setOtherMajor(false)
      resetField("inputMajor")
    } 
  }

  function otherSchoolInput(value: string) {
    console.log(value)
    if (value == "other") {
        setOtherSchool(true)
    } else {
        setOtherSchool(false)
        resetField("inputSchool")
    }
  }
  
  const changeHandler = (value: React.SetStateAction<string>) => {
    setValue(value)
    console.log(value)
    console.log(options)
  }

  return (
    <>
        <div className="min-h-screen pt-2 font-mono my-16">
        <div className="container mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
                {/* <h2 className="text-2xl text-gray-900">Participant Information</h2> */}
                <form className="mt-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        {/* <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>email address</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter email' />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6 '>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>password</label>
                            <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">change your password</button>
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>pick your country</label>
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>fav language</label>
                            <div className="flex-shrink w-full inline-block relative">
                                <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                                    <option>choose ...</option>
                                    <option>English</option>
                                    <option>France</option>
                                    <option>Spanish</option>
                                </select>
                                <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div> */}
                        <div className="personal w-full pt-4">
                            <h2 className="text-2xl text-gray-900">Personal info:</h2>
                            <div className="flex items-center justify-between mt-4">
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >first name<span className="text-red-600">*</span></label>
                                    <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("firstName", {required: "Please enter your first name", maxLength: 50, pattern: {value: /^[a-z ,.'-]+$/i, message: "Contains invalid characters"}})} type='text' />
                                    {errors.firstName ? (
                                        <>
                                        {errors.firstName.type === "required" && (
                                            <p className="text-red-500">
                                            {errors.firstName.message}
                                            </p>
                                        )}
                                        {errors.firstName.type === "pattern" && (
                                            <p className="text-red-500">
                                            {errors.firstName.message}
                                            </p>
                                        )}
                                        </>
                                    ) : null}
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >last name<span className="text-red-600">*</span></label>
                                    <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("lastName", {required: "Please enter your last name", maxLength: 50, pattern: {value: /^[a-z ,.'-]+$/i, message: "Contains invalid characters"}})} type='text' />
                                    {errors.lastName ? (
                                        <>
                                        {errors.lastName.type === "required" && (
                                            <p className="text-red-500">
                                            {errors.lastName.message}
                                            </p>
                                        )}
                                        {errors.lastName.type === "pattern" && (
                                            <p className="text-red-500">
                                            {errors.lastName.message}
                                            </p>
                                        )}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>gender<span className="text-red-600">*</span></label>
                                <div className="flex-shrink w-full inline-block relative">
                                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("gender", {required: "Select gender"})} >
                                        <option value="">Select your gender</option>
                                        {Object.keys(GenderEnum).map(key =>
                                            <option key={key} value={key}>{GenderEnum[key as keyof typeof GenderEnum]}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                    {errors.gender && <p className="text-red-400">{errors.gender.message}</p>}
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>pick your country of residence<span className="text-red-600">*</span></label>
                                {/* <div className="flex-shrink w-full inline-block relative"> */}
                                    <Controller
                                        name="countryResidence"
                                        rules={{required: "Please select a country"}}
                                        render={({ field: { name, onChange, value } }) => (
                                            <Select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" placeholder={<div>SDFSDF</div>} options={options} value={value} onChange={onChange} name={name} />
                                        )}
                                        control={control}
                                    />
                                    {/* <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div> */}
                                {/* </div> */}
                            </div>
                            <div className='w-full md:w-1/2 px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >phone Number<span className="text-red-600">*</span></label>
                                {/* <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("lastName")} type='text'  required /> */}
                                <div className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'>
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value)
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                value={value}
                                                onChange={onChange}
                                                defaultCountry="US"
                                                id="phoneNumber"
                                            />
                                        )}
                                    />
                                    {errors["phoneNumber"] && (
                                        <p className="error-message">Invalid Phone</p>
                                    )}
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>current School Year<span className="text-red-600">*</span></label>
                                <div className="flex-shrink w-full inline-block relative">
                                    {/* <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("year")} >
                                        <option value="freshman">{YearEnum.freshman}</option>
                                        <option value="sophomore">{YearEnum.sophomore}</option>
                                        <option value="junior">{YearEnum.junior}</option>
                                        <option value="senior">{YearEnum.senior}</option>
                                        <option value="fifth">{YearEnum.fifth}</option>
                                        <option value="sixth">{YearEnum.sixth}</option>
                                        <option value="masters">{YearEnum.masters}</option>
                                        <option value="other">{YearEnum.other}</option>
                                    </select> */}
                                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("year")} >
                                        {Object.keys(YearEnum).map(key =>
                                            <option key={key} value={key}>{YearEnum[key as keyof typeof YearEnum]}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>current major<span className="text-red-600">*</span></label>
                                <div className="flex-shrink w-full inline-block relative">
                                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("major")} >
                                        {Object.keys(MajorEnum).map(key =>
                                            <option key={key} value={key}>{MajorEnum[key as keyof typeof MajorEnum]}</option>)}
                                    </select>
                                    {otherMajor ? <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("inputMajor")} type='text' /> : null}
                                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >minor</label>
                                    <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("lastName")} type='text' />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>select your school<span className="text-red-600">*</span></label>
                                {/* <div className="flex-shrink w-full inline-block relative"> */}
                                    <Controller
                                        name="school"
                                        render={({ field: { name, onChange, value } }) => (
                                            <Select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" options={schoolOptions} value={value} onChange={onChange} name={name} />
                                        )}
                                        control={control}
                                    />
                                    {otherSchool ? <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("inputSchool")} type='text' /> : null}
                                    {/* <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div> */}
                                {/* </div> */}
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>enter school email address (.edu)<span className="text-red-600">*</span></label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("email", {required: "Please enter your school email", pattern: {value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.edu)/, message: "Needs to be a valid school email"}})} id='grid-text-1' type='text' placeholder='Enter school email' />
                                {/* {errors.email && <p className="text-red-400">{errors.email.message}</p>} */}
                                {errors.email ? (
                                    <>
                                    {errors.email.type === "required" && (
                                        <p className="text-red-500">
                                        {errors.email.message}
                                        </p>
                                    )}
                                    {errors.email.type === "pattern" && (
                                        <p className="text-red-500">
                                        {errors.email.message}
                                        </p>
                                    )}
                                    </>
                                ) : null}
                            </div>
                            {/* <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Current School Year</label>
                                <div className="flex-shrink w-full inline-block relative">
                                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("participated")} >
                                        <option value="yes">{Participated.yes}</option>
                                        <option value="no">{Participated.no}</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div> */}
                            <div className='w-full md:w-full px-3 mb-6'>
                            
                            <Controller
                                control={control}
                                name="participated"
                                render={({ field: { onChange, value } }) => (
                                    <>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>have you participated in a hackathon before?<span className="text-red-600">*</span></label>
                                    <label>Yes<input className="mr-10" id='grid-text-1' type='radio' onChange={() => onChange(true)} checked={value === true} /></label>
                                    <label>No<input id='grid-text-1' type='radio' onChange={() => onChange(false)} checked={value === false} /></label>
                                    </>
                                )}
                            />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >what do you hope to see from UGA Hacks 8?<span className="text-red-600">*</span></label>
                                <textarea className='bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white' {...register("hopeToSee")} ></textarea>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>dietary restrictions:</label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' {...register("dietaryRestrictions")} id='grid-text-1' type='text' placeholder='Enter dietary restrictions' />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Shirt size<span className="text-red-600">*</span></label>
                                <div className="flex-shrink w-full inline-block relative">
                                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded" {...register("shirtSize")} >
                                        {Object.keys(SizeEnum).map(key =>
                                            <option key={key} value={key}>{SizeEnum[key as keyof typeof SizeEnum]}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                            
                                <Controller
                                    control={control}
                                    name="codeOfConduct"
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'><em>MLH Code of Conduct: </em>"I have read and agree to the <Link href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" className="text-blue-600">MLH Code of Conduct</Link>."<span className="text-red-600">*</span></label>
                                        <label>Yes <input className="mr-10" id='grid-text-1' type='radio' onChange={() => onChange(true)} checked={value === true} /></label>
                                        </>
                                    )}
                                />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                            
                                <Controller
                                    control={control}
                                    name="eventLogisticsInfo"
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'><em>Event Logistics Information: </em>“I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <Link href="https://mlh.io/privacy" target="_blank" className="text-blue-600">MLH Privacy Policy</Link>. I further agree to the terms of both the <Link href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" className="text-blue-600">MLH Contest Terms and Conditions</Link> and the <Link href="https://mlh.io/privacy" target="_blank" className="text-blue-600">MLH Privacy Policy</Link>.”<span className="text-red-600">*</span></label>
                                        <label>Yes <input className="mr-10" id='grid-text-1' type='radio' onChange={() => onChange(true)} checked={value === true} /></label>
                                        </>
                                    )}
                                />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                            
                                <Controller
                                    control={control}
                                    name="mlhCommunication"
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'><em>Communication from MLH: </em>“I authorize MLH to send me an email where I can further opt into the MLH Hacker, Events, or Organizer Newsletters and other communications from MLH."<span className="text-red-600">*</span></label>
                                        <label>Yes <input className="mr-10" id='grid-text-1' type='radio' onChange={() => onChange(true)} checked={value === true} /></label>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">Register!</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
