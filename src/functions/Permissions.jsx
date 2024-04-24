export const Calc_permission = (category, role_type, dno_status) => {
  const role = (dno_status && category != "GP") ? 0 : role_type;

  const permissionList = [
    { category: "HQ", roleType: 1, dnoStatus: true, uniqueId: 0 },
    { category: "HQ", roleType: 1, dnoStatus: false, uniqueId: 1 }, //! karmashree admin
    { category: "HQ", roleType: 3, dnoStatus: true, uniqueId: 2 },
    { category: "HQ", roleType: 3, dnoStatus: false, uniqueId: 3 },
    { category: "HQ", roleType: 2, dnoStatus: true, uniqueId: 4 },
    { category: "HQ", roleType: 2, dnoStatus: false, uniqueId: 5 },

    { category: "HD", roleType: 1, dnoStatus: true, uniqueId: 6 },
    { category: "HD", roleType: 1, dnoStatus: false, uniqueId: 7 }, //! dept name
    { category: "HD", roleType: 3, dnoStatus: true, uniqueId: 8 },
    { category: "HD", roleType: 3, dnoStatus: false, uniqueId: 9 },
    { category: "HD", roleType: 2, dnoStatus: true, uniqueId: 10 },
    { category: "HD", roleType: 2, dnoStatus: false, uniqueId: 11 },

    { category: "DIST", roleType: 0, dnoStatus: true, uniqueId: 12 }, //! dist name
    { category: "DIST", roleType: 1, dnoStatus: false, uniqueId: 13 }, //! dept name/ dist name
    { category: "DIST", roleType: 3, dnoStatus: false, uniqueId: 15 }, //! dept name/ dist name
    { category: "DIST", roleType: 2, dnoStatus: false, uniqueId: 17 }, //! dept name/ dist name

    { category: "SUB", roleType: 1, dnoStatus: true, uniqueId: 18 },
    { category: "SUB", roleType: 1, dnoStatus: false, uniqueId: 19 }, //! dist name / sub name
    { category: "SUB", roleType: 3, dnoStatus: true, uniqueId: 20 },
    { category: "SUB", roleType: 3, dnoStatus: false, uniqueId: 21 }, //! dist name / sub name
    { category: "SUB", roleType: 2, dnoStatus: true, uniqueId: 22 },
    { category: "SUB", roleType: 2, dnoStatus: false, uniqueId: 23 }, //! dist name / sub name

    { category: "BLOCK", roleType: 0, dnoStatus: true, uniqueId: 24 }, //! dist name / block name
    { category: "BLOCK", roleType: 1, dnoStatus: false, uniqueId: 25 }, //! dist name / block name
    { category: "BLOCK", roleType: 3, dnoStatus: false, uniqueId: 27 }, //! dist name / block name
    { category: "BLOCK", roleType: 2, dnoStatus: false, uniqueId: 29 }, //! dist name / block name

    { category: "GP", roleType: 1, dnoStatus: true, uniqueId: 30 }, //! dist name / block name/ gp name
    { category: "GP", roleType: 1, dnoStatus: false, uniqueId: 31 }, //! dist name / block name/ gp name
    { category: "GP", roleType: 3, dnoStatus: true, uniqueId: 32 }, //! dist name / block name/ gp name
    { category: "GP", roleType: 3, dnoStatus: false, uniqueId: 33 }, //! dist name / block name/ gp name
    { category: "GP", roleType: 2, dnoStatus: true, uniqueId: 34 }, //! dist name / block name/ gp name
    { category: "GP", roleType: 2, dnoStatus: false, uniqueId: 35 }, //! dist name / block name/ gp name
  ];

  return permissionList.find(
    (p) =>
      p.category === category &&
      p.roleType === role &&
      p.dnoStatus === dno_status
  );
};
