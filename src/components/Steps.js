import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button } from '../styles';
import { ReactComponent as Download } from '../svgs/download.svg';
import { ReactComponent as DarkMode } from '../svgs/darkmode.svg';
import { ReactComponent as Share } from '../svgs/share.svg';
import { primary, success } from '../styles/constants';
import { usePdf } from '../DarcoContext';

const buttonTexts = ["", "Select", "Convert", "Download"]

const Steps = () => {
    const { state, dispatch } = usePdf()
    const inputFile = useRef(null)
    
    const onButtonClick = () => {
        if (state.pdf === null)
            inputFile.current.click()
    }

    const onFileChange = e => dispatch({ type: 'load', data: e.target.files[0] })
    
    return (
        <>
            <Step stepDiff={1 - state.step}>
                <Download fill={1 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Select</StepTitle>
                    <StepDescription>Choose from Files</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step stepDiff={2 - state.step}>
                <DarkMode fill={2 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Convert</StepTitle>
                    <StepDescription>Convert PDF to dark mode</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step stepDiff={3 - state.step}>
                <Share fill={3 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Download</StepTitle>
                    <StepDescription>Export PDF anywhere</StepDescription>
                </StepTextWrapper>
            </Step>
            <Button onClick={onButtonClick}>{buttonTexts[state.step]}</Button>
            <input type="file" accept="application/pdf" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} />
        </>
    );
}

export default Steps;

// Styling

const Step = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 2rem;
    & > * {
        margin-right: 1rem;
    }
    ${props => props.stepDiff > 0 && `opacity: 0.${100 - (props.stepDiff * 30)}`}
    ${props => props.stepDiff < 0 && `color: ${success}`}
`
const StepTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const StepTitle = styled.p`
font-weight: 600;
font-size: 1.2rem;
letter-spacing: -0.04rem;
`
const StepDescription = styled.p`
    font-weight: 400;
    font-size: 1.2rem;
    letter-spacing: -0.04rem;
`