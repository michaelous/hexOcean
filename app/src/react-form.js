import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {SubmitBtn} from "./styled-components/submitBtn";
import {HookForm} from "./styled-components/hookForm";
import {FormLabel} from "./styled-components/formLabel";
import {FormInput} from "./styled-components/formInput";
import {FormSection} from "./styled-components/formSection";
import {FormAlert} from "./styled-components/formAlert";
import {FormSelect} from "./styled-components/formSelect";
import {FormOption} from "./styled-components/formOption";

const URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes';
const initialFoodType = 'pizza';


export const Form = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [foodType, setFoodType] = useState(initialFoodType);

    useEffect(() => {
        reset();
    }, [foodType])

    const onSubmit = async (data) => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(URL, config)
            if (response.ok) {
                return response
            }
        } catch (error) {
            console.log(error)
        }
    };


    const dishTypeSwitch = (Type) => {
        switch (Type) {
            case 'pizza':
                return <>
                    <FormLabel htmlFor="number_of_slices">Pizza slices</FormLabel>
                    <FormInput type="number" placeholder="Slices quantity" {...register("number_of_slices", {
                        required: "Required",
                        min: {
                            value: 4,
                            message: "Minimum 4 slices"
                        },
                        max: {
                            value: 12,
                            message: "Maximum 12 slices"
                        }
                    })} />
                    {errors.number_of_slices && <FormAlert role="alert">{errors.number_of_slices.message}</FormAlert>}

                    <FormLabel htmlFor="diameter">Pizza diameter</FormLabel>
                    <FormInput type="number" placeholder="Pizza diameter" {...register("diameter", {
                        required: "Required",
                        min: {
                            value: 20,
                            message: "Minimum 20 diameter"
                        },
                        max: {
                            value: 60,
                            message: "Maximum 60 diameter"
                        }
                    })} />
                    {errors.diameter && <FormAlert role="alert">{errors.diameter.message}</FormAlert>}
                </>

            case 'soup':
                return <>
                    <FormLabel htmlFor="spicness_scale">Soup spicness</FormLabel>
                    <FormInput type={'number'} placeholder="Spicness scale" {...register("spicness_scale", {
                        required: "Required",
                        min: {
                            value: 1,
                            message: "Minimum 1"
                        },
                        max: {
                            value: 10,
                            message: "Maximum 10"
                        }
                    })} />
                    {errors.spicness_scale && <FormAlert role="alert">{errors.spicness_scale.message}</FormAlert>}
                </>

            case 'sandwich':
                return <>
                    <FormLabel htmlFor="sandwich_slices">Sandwich Slices</FormLabel>
                    <FormInput type="number" placeholder="Sandwich slices" {...register("sandwich_slices", {
                        required: "Required",
                        min: {
                            value: 1,
                            message: "Minimum 1 slice"
                        },
                        max: {
                            value: 10,
                            message: "Maximum 10 slices"
                        }
                    })} />
                    {errors.sandwich_slices && <FormAlert role="alert">{errors.sandwich_slices.message}</FormAlert>}
                </>
        }
    }


    return (
        <HookForm onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
                <FormLabel htmlFor="name">Dish Name</FormLabel>
                <FormInput placeholder="Dish Name" {...register("name", {
                    required: "Required",
                    pattern: {
                        value: /(\w)/,
                        message: "Missing Dish Name"
                    }
                })} />
                {errors.name && <FormAlert role="alert">{errors.name.message}</FormAlert>}

                <FormLabel htmlFor="preparation_time">Preparation Time</FormLabel>
                <FormInput placeholder="Preparation Time"  {...register("preparation_time", {
                    required: "Required",
                    pattern: {
                        value: /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/,
                        message: 'Format: HH:MM:SS'
                    }
                })} />
                {errors.preparation_time && <FormAlert role="alert">{errors.preparation_time.message}</FormAlert>}

                <FormLabel htmlFor="dishType">Dish Type</FormLabel>

                <FormSelect  {...register("type")}
                             value={foodType}
                             onChange={(e) => {
                                 setFoodType(e.target.value)
                             }}>
                    <FormOption value="pizza">pizza</FormOption>
                    <FormOption value="soup">soup</FormOption>
                    <FormOption value="sandwich">sandwich</FormOption>
                </FormSelect>

                {dishTypeSwitch(foodType)}

                <SubmitBtn className={"submitBtn"} type="submit">SUBMIT</SubmitBtn>
            </FormSection>
        </HookForm>
    );
}