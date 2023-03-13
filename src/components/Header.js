import {Link, useNavigate} from "react-router-dom";
import { Button} from 'antd';
import { UploadOutlined} from '@ant-design/icons';

const Header = () => {
  let navigate=useNavigate();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="../images/icons/logo.png" alt="" />
          </Link>
          <Button icon={<UploadOutlined />} size="large" onClick={()=>{navigate('/UploadPage')}}>상품업로드</Button>
        </div>
      </div>
    </div>
  );
};
export default Header;