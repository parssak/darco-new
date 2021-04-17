import React, { useRef } from 'react';
import styled from 'styled-components';
import { usePdf, ReducerTypes } from '../DarcoContext';
import { Button, SidePanel } from '../styles'
import SegmentedPicker from './SegmentedPicker';
import ThemePicker from './ThemePicker';

const DataTitle = styled.h3`
    font-size: 1.4rem;
    letter-spacing: -0.01rem;
    ${props => props.bottomSpaced && `margin-bottom: 0.5rem;`}
`
const DataSubTitle = styled.h4`
    font-size: 1rem;
    color: rgba(153, 153, 153, 1);
`
const DataSection = styled.div`
    margin-bottom: 1.5rem;
`
const PDFData = () => {
    const inputFile = useRef(null)
    const { state, dispatch } = usePdf()
    
    const options = ['High', 'Low'];
    if (!state.info)
        return null
    
    const updateTheme = e => {
        console.log("Got ", e);
        if (state.options.theme !== e)
            dispatch({type: ReducerTypes.O_Theme, data: e})
    }

    const updateQuality = e => {
        console.log("Got ", e);
        if (state.options.quality !== e)
            dispatch({ type: ReducerTypes.O_Quality, data: e })
    }
    
    const onFileChange = e => dispatch({ type: 'load', data: e.target.files[0] })
    return (
        <SidePanel>
            <DataSection>
                <div className="h">
                    <DataTitle>{state.pdf.name}</DataTitle>
                    <h3>{Math.round(state.pdf.size / 1024)} Kb</h3>
                </div>
                <div className="h">
                    <DataSubTitle>Last modified: {new Date(state.pdf.lastModified).toLocaleDateString()} </DataSubTitle>
                    <DataSubTitle>{state.info.numPages} page{state.info.numPages > 1 && 's'}</DataSubTitle>
                </div>
            </DataSection>
            <DataSection>
                <div className="h">
                    <DataTitle bottomSpaced>Quality</DataTitle>
                </div>
                <SegmentedPicker
                    options={options}
                    onSelectionChange={updateQuality}
                />
            </DataSection>
            <DataSection style={{height: '33%'}}>
                <div className="h">
                    <DataTitle bottomSpaced>Theme</DataTitle>
                </div>
                <ThemePicker onSelectionChange={updateTheme}/>
            </DataSection>
            <Button secondary onClick={() => inputFile.current.click()} style={{ marginTop: 'auto'}}>Select New File</Button>
            <input type="file" accept="application/pdf" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} />
        </SidePanel>
    )
}


export default PDFData;
