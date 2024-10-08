import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dropdown, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Clock from 'react-live-clock';
import logoPln from './top_bar_menu.jpeg';
import _head from 'lodash/head';
import { concat, debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { MENU } from "@app/configs/menu.config";
import { OPTIONS_DISPLAY_SCALE } from '@app/configs/select-options.config';
import { initFlatMenu } from "@app/helper/menu.helper";
import { setActivePage, setThemeMode, setApplication, toggleSidebarMenu } from "@app/store/reducers/ui";
import { useApp } from '@app/context/AppContext';
import { logoutUser } from '@app/store/reducers/auth';
import LazyImage from '@app/components/LazyLoad/LazyImage';
import NotificationCenter from '@app/modules/Notification/NotificationCenter';
import { cdnUrl } from '@app/helper/cdn.helper';

import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
moment.locale('id-ID');

export default function Header() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menu, setMenu] = useState<any>();
  const [search, setSearch] = useState<any>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { navigation, application, themeMode, collapsedSidebar } = useSelector((state: any) => state.ui);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { currentUser } = useSelector((state: any) => state.auth);
  const { onChangeSearchValue } = useApp();
  const [roleActions, setRoleActions] = useState<any>({});
  /** HANDLE LOGOUT */
  const logoutProcessing = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
    // window.location.href = "/signin"
    navigate("/signin");
  };


  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const onChangeScale = (value: string) => {
    const params: any = { ...application, scaling: value }
    dispatch(setApplication(params));
  }
  
  const toggleThemeMode = () => {
    const mode = themeMode == 'light' ? 'dark' : 'light';
    dispatch(setThemeMode(mode));
    setIsDarkMode(!isDarkMode);
  }

  

  useEffect(() => {
    const flatNavigation = initFlatMenu(navigation);
    const navs = concat(flatNavigation, MENU)
    const activeMenu: any = _head(
      navs.filter((f: any) => f.path != '' && location?.pathname.includes(f.path))
      // navs.filter((f: any) => f.path != '' && location?.pathname == f.path)
    );
    setMenu(activeMenu);
    dispatch(setActivePage({ ...activeMenu, isSubUrl: activeMenu?.path != location.pathname }))
    document.title = activeMenu
      ? `${activeMenu?.display} - ${process.env.APP_NAME}`
      : `${process.env.APP_NAME}`;

    setSearch('');
    onChangeSearchValue('');
  }, [location?.pathname]);

  useEffect(() => {
    debouncedSearchHandler(search);
  }, [search]);

  /**
   * ! Search handler & debounce
   * @param event
   */
  const searchHandler = (value: any) => {
    onChangeSearchValue(value || '');
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("roles")
    const roleAct = {
      setting: ROLE_ACTION(roleAccess, 'setting'),
    };
    setRoleActions(roleAct);
  }, [])

  return (
    <>
      <nav
        className={`site-header light sticky-top py-2 sidebar-expand border-0 ${collapsedSidebar == 'collapse' ? 'collapse-sidebar' : collapsedSidebar
          
        }`}
        style={{ 
          backgroundImage: `url(${logoPln})`, 
          backgroundSize: 'contain',  // Gambar diubah ukurannya untuk menyesuaikan ukuran elemen tanpa memotong
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '4% center',  // Geser gambar ke kanan sebesar 90% dari lebar elemen
        
         
      }}
        >
        
        {/* LEFT */}
        <div className='container d-flex justify-content-between'>
          <div
            className='align-items-center d-flex animate__animated animate__fadeIn elipsis'
            style={{ padding: '.75rem 0' }}
          >
            {/* BUTTON MENU RESPONSEIVE  */}
            <Button
              onClick={() => dispatch(toggleSidebarMenu())}
              type='button'
              className='d-block d-sm-none me-3 p-0 bg-transparent text-body no-outline'
              variant='btn-link'
              size='lg'
            >
              <i className='fas fa-bars'></i>
            </Button>

            {/* BUTTON MENU BACK  */}
            <Button
              // onClick={() => navigate(-1)}
              onClick={() => dispatch(toggleSidebarMenu())}
              type='button'
              className='d-none d-sm-block me-3 p-0 bg-transparent text-white no-outline'
              variant='btn-link'
            >
              <i className='fas fa-bars' ></i>
            </Button>

            <h5 className={`m-0 ${themeMode === 'light' ? 'text-light' : 'text-dark'}`}>
                {menu?.display}
              </h5>
          </div>

          {/* RIGHT */}
          <div className='d-flex align-items-center animate__animated animate__fadeIn'>
            <span className='d-none d-md-block' style={{ width: '13rem' }}>
              <Clock format={'dddd, D MMM YYYY HH:mm:ss'} ticking={true} className={themeMode === 'dark' ? 'text-light' : 'text-dark'} />
            </span>
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              rootClose={true}
              overlay={
                <Popover id='popover-difficulty'>
                  <Popover.Body className='pt-3'>
                    <ListGroup variant='flush'>
                      {OPTIONS_DISPLAY_SCALE().map((x: any, index: number) => (
                        <ListGroup.Item
                          key={index}
                          className={`bg-transparent text-center cursor-pointer ${application?.scaling == x.value
                            ? 'text-primary'
                            : ''
                            }`}
                          onClick={() => onChangeScale(x.value)}
                        >
                          {x.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Popover.Body>
                </Popover>
              }
            >
              <a className='font-weight-bold cursor-pointer'>
                <i className='fa-solid fa-font'></i>
              </a>
            </OverlayTrigger>
            {roleActions?.setting &&
              <Link
                to='/admin/settings'
                className='btn bg-transparent font-weight-bold font-sise-large no-outline position-relative rounded-circle ms-3'
              >
                <i className='fa-solid fa-gear'></i>
              </Link>
            }


            <Button
              onClick={() => setShowNotification(true)}
              variant=''
              size='lg'
              className='bg-transparent font-weight-bold ms-2 me-2 font-sise-large no-outline position-relative rounded-circle ms-3'
              style={{
                border: '1px solid var(--black-100)',
                padding: '.3rem .65rem',
              }}
              hidden
            >
              <i className='fa-regular fa-bell'></i>
              <span className='position-absolute top-5 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
                <span className='visually-hidden'>New alerts</span>
              </span>
            </Button>

            <Dropdown className='hide-toogle mmenu hide-focus ms-2'>
              <Dropdown.Toggle className='p-0 bg-transparent border-0 no-outline'>
                <div className='align-items-center d-flex py-2'>
                  <LazyImage
                    src={cdnUrl(currentUser?.avatar)}
                    className='avatar-img image-circle bg-white'
                    style={{ width: '2.75rem', height: '2.75rem' }}
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className='transform-right'>
                <Link
                  key='account'
                  to='/account/profile'
                  className='dropdown-item'
                >
                  <i className='fa-regular fa-user me-1' />
                  {currentUser?.fullname}
                </Link>
                <div
                  className='dropdown-item cursor-pointer'
                  onClick={() => toggleThemeMode()}
                >
                  <i
                    className={`me-1 fa-regular fa-${themeMode == 'light' ? 'moon' : 'sun'
                      }`}
                  />
                  {themeMode == 'light' ? 'Dark' : 'Light'} Mode
                </div>
                <hr className='my-2' />
                <a
                  className='dropdown-item text-danger cursor-pointer'
                  onClick={logoutProcessing}
                >
                  <i className='fa-solid fa-arrow-right-from-bracket me-1' />
                  Keluar
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* <div className='container mt-3'>
        <h3 className='my-3'>{menu?.display}</h3>
      </div> */}
      </nav>

      {showNotification && (
        <NotificationCenter setShowNotification={setShowNotification} />
      )}
    </>
  );
}
