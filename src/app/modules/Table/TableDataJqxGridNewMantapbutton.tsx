import React from 'react';
import ReactDOM from 'react-dom';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';

interface ToolbarProps {
  addbtn?: boolean;
  handleAddClick?: () => void;
  [key: string]: any; // Allow any additional props
}

const Toolbar: React.FC<ToolbarProps> = ({ addbtn, handleAddClick }: ToolbarProps) => (
  <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', position: 'relative', margin: '5px' }}>
    {addbtn && (
      <JqxButton
        onClick={handleAddClick}
        theme='themeJqx'
        width={120}
        height={20}
        style={{ display: 'inline-block', marginLeft: '5px', backgroundColor: '#0484cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}
        className="jqx-button-custom"
      >
        <span>Tambah Data</span>
        <i className="fa-solid fa-plus"></i>
      </JqxButton>
    )}
    {/* Add more buttons as needed */}
  </div>
);

const cellsrenderer = (row: number, column: any, value: any, data: any) => {
  const container = document.createElement('div');
  container.style.display = 'flex'; // Ensure proper alignment

  // Render the React component into the container
  ReactDOM.render(<Toolbar addbtn={true} handleAddClick={() => console.log('Add button clicked')} />, container);

  return container.outerHTML;
};

const columns = [
  // Your other columns
  {
    text: 'Actions',
    datafield: 'actions',
    cellsrenderer,
    width: 200,
    sortable: false,
    filterable: false,
  }
];

export default columns;
