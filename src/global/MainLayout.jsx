import React from "react";
import { Outlet } from "react-router-dom";
import {DashboardLayout, PageContainer} from "@toolpad/core";
import useSWR from "swr";
import axios from "axios";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const fetcher = url => axios.get(url).then(res => res.data)

const MainLayout = () => {
    const { data, error, isLoading:loading } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);

    const NAVIGATION = !loading && !error ? data.result.views.map((view, index) => ({
        kind: 'link',
        title: view.name,
        segment: `information/${index}`,
        icon: <MenuOutlinedIcon />
    })) : [{
        kind: 'link',
        title: 'Loading...',
        segment: 'home',
        icon: <MenuOutlinedIcon />
    }];

    return (
      <DashboardLayout navigation={NAVIGATION}>
          <PageContainer>
              <Outlet />
          </PageContainer>
      </DashboardLayout>
  );
};

export default MainLayout;
