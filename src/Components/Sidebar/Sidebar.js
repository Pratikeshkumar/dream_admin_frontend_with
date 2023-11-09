import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from 'react-pro-sidebar';
import { ImNewspaper } from 'react-icons/im';
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from 'react-icons/fi';
import { FaUserMd, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { BsListOl, BsFillStopwatchFill } from 'react-icons/bs';
import { GrList } from 'react-icons/gr';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { BiCommentAdd } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { RiFileAddLine } from 'react-icons/ri';
import 'react-pro-sidebar/dist/css/styles.css';
import useAuth from '../../useAuth'

import './Sidebar.css';

const Sidebar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { user, isAuthenticated } = useAuth()
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div className='header' style={{}}>
      <ProSidebar collapsed={menuCollapse}>

        <SidebarHeader>
          <div className="logotext" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <p style={{ fontSize: 25 }}>{menuCollapse ? <FaUserCircle /> : ' Dream Admin Panel'}</p>
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>




            <SubMenu icon={<FaUserMd />} title="Users">

              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/users/all_users">All Users</Link>
              </MenuItem>

              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/users/basic_users">Basic Users</Link>
              </MenuItem>

              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/users/premium_users">Premium Users</Link>
              </MenuItem>


              <MenuItem icon={<BsListOl />}>
                <Link to="/users/business_users">Business Users</Link>
              </MenuItem>

              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/users/reported_users">Reported Users</Link>
              </MenuItem>

              <MenuItem icon={<BsListOl />}>
                <Link to="/users/blocked_users">Blocked Users</Link>
              </MenuItem>
            </SubMenu>






            <SubMenu icon={<FaUserAlt />} title="Videos">
              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/videos/all_videos">All Videos</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/videos/reported_videos">Reported Videos</Link>
              </MenuItem>
              <MenuItem icon={<FcCalendar />}>
                <Link to="/videos/blocked_videos">Blocked Videos</Link>
              </MenuItem>
            </SubMenu>







            {/* <MenuItem active={true} icon={<FiHome />}>
            <Link to="/">Sound</Link>
          </MenuItem> */}

            <SubMenu icon={<FaUserAlt />} title="Bank Transaction">
              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/bank_transactions/success">Success</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/bank_transactions/failure">Failure</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu icon={<FaUserAlt />} title="Diamond Transaction">
              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/diamond_transactions/all_transaction">All Transactions</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/diamond_transactions/video_transaction">Video</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/diamond_transactions/live_transaction">Live </Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/diamond_transactions/messages_transaction">Messages </Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/diamond_transactions/comment_transaction">Comments </Link>
              </MenuItem>
            </SubMenu>


            <SubMenu icon={<FaUserAlt />} title="Promotions">
              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/promotions/all_promotions">All</Link>
              </MenuItem>
              <MenuItem icon={<MdPersonAddAlt1 />}>
                <Link to="/promotions/live_promotions">Live</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/promotions/accomplished_promotions">Accomplished</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/promotions/reported_promotions">Reported</Link>
              </MenuItem>
              <MenuItem icon={<BsListOl />}>
                <Link to="/promotions/failure_promotions">Failure</Link>
              </MenuItem>
            </SubMenu>


            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/verification_request">Verification request</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/countries">Countries</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/cities">Cities</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/gifts">Gifts</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/withdrawel_request">Withdrawal request</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/push_notification">Push Notification</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/diamond_rate">Dollar/Diamond rate</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/hobbies">Hobbies</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/occupations">Occupations</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/languages">Languages</Link>
            </MenuItem>


            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/avatar">Avatar</Link>
            </MenuItem>


            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/privacy_policy">Privacy Policy</Link>
            </MenuItem>

            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/terms_and_conditions">Terms & Conditions</Link>
            </MenuItem>



            {user?.role === 'superadmin' ? (
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/employee">Employee</Link>
              </MenuItem>
            ) : null}



            <SubMenu icon={<ImNewspaper />} title="Profile">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/profile"> Your Profile</Link>
              </MenuItem>
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/profile"> {user?.role === 'superadmin' ? 'Employees' : 'My'} Transactions</Link>
              </MenuItem>
              {user?.role === 'superadmin' && (
                <MenuItem active={true} icon={<FiHome />}>
                  <Link to="/profile"> My Transactions</Link>
                </MenuItem>
              )}

            </SubMenu>

            <SubMenu icon={<ImNewspaper />} title="Generate Report">
              <MenuItem icon={<RiFileAddLine />}>
                <Link to="/generate_reports/new_reports">New Reports</Link>
              </MenuItem>
              <MenuItem icon={<GrList />}>
                <Link to="/generate_reports/all_reports">All Reports</Link>
              </MenuItem>
              <MenuItem icon={<FcCalendar />}>
                <Link to="/generate_reports/recent_reports">Recent Report</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>
              <Link to="/logout">Logout</Link>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>


    </div>


  );
};

export default Sidebar;
