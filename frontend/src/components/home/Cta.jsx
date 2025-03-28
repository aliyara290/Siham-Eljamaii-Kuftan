import React from 'react'
import styled from 'styled-components'
import Heading from '../heading/Heading'
import SubHeading from '../heading/SubHeading'


const StyledCta = styled.section`
margin-top: 5rem;
width: 100%;
height: 40rem;
background-color: #f4f0eb;
display: flex;
align-items: center;
justify-content: center;
`

const StyledCtaContent = styled.div`
width: max-content;
`
const StyledForm = styled.div`
width: 100%;
margin-top: 3rem;
`
const StyledInputContent = styled.div`
direction: ltr;
display: grid;
grid-template-columns: repeat(6, 1fr);
width: 100%;
max-width: 60rem;
border: 1px solid #00000020;
`
const StyledInputField = styled.input`
width: 100%;
grid-column: span 4 / span 4;
height: 4.5rem;
background-color: #fff;
padding: 0 2rem;
font-size: var(--text-md);
outline: none;
`
const StyledSubmitBtn = styled.button`
width: 100%;
grid-column: span 2 / span 2;
background-color: var(--neutral-900);
color: var(--white);
font-size: var(--text-md);
cursor: pointer;
&:hover {
    background-color: #000000;
}
`



const Cta = () => {
  return (
    <StyledCta>
        <StyledCtaContent>
            <Heading title={"انضـم إلى نشـرتـنا الإخـبـاريـة"} weight={500} />
            <SubHeading title={"كن أول من يعرف عن المجموعات الجديدة والعروض الحصرية."} size={"lg"} />
            <StyledForm>
                <StyledInputContent>
                    <StyledInputField placeholder='Email' name='email' />
                    <StyledSubmitBtn>
                        إشتـرك
                    </StyledSubmitBtn>
                </StyledInputContent>
            </StyledForm>
        </StyledCtaContent>
    </StyledCta>
  )
}

export default Cta