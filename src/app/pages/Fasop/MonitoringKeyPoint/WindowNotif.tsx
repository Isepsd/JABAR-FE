import React, { useRef } from 'react';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';

const WindowNotif: React.FC = () => {
    const myWindow = useRef<JqxWindow>(null);

    const showWindowButtonClick = (): void => {
        myWindow.current?.open();
    };

    return (
        <div>
            <JqxButton onClick={showWindowButtonClick} value="Show" width={80} />

            <JqxWindow
                ref={myWindow}
                width={270}
                height={165}
                maxHeight={180}
                maxWidth={280}
                minHeight={30}
                minWidth={250}
                cancelButton={'.cancel'}
                okButton={'.ok'}
                resizable={false}
                isModal={true}
                modalOpacity={0.3}
                position={{ x: 90, y: 140 }}
                draggable={true}
            ></JqxWindow>
        </div>
    );
};

export default WindowNotif;
