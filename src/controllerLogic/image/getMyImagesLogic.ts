// const getMyImagesLogic = async(page: string, limit: string ,permission: string)=>
// {
//     const { page, limit, permission } = req.query;

//     let _page = parseInt(page as string) || 1;
//     _page = Math.max(_page, 1);

//     let _limit = parseInt(limit as string) || 10;
//     _limit = Math.max(_limit, 1);

//     const filter: any = { userId: req.user._id };

//     if (permission && allPermissions.includes(permission as string)) {
//       filter.permission = permission;
//     }

//     const allImages: Image[] = await ImageModel.find(filter)
//       .skip((_page - 1) * _limit)
//       .limit(_limit)
//       .select('url');

//     const totalDocs: number = await ImageModel.countDocuments(filter);
//     const totalPages: number = Math.ceil(totalDocs / _limit);
//     const response: any = {};

//     response.currentPage = _page;
//     response.prevPage = _page > 1 ? _page - 1 : null;
//     response.nextPage = _page < totalPages ? _page + 1 : null;
//     response.totalPages = totalPages;
//     response.totalResults = totalDocs;
//     response.results = allImages;
// }
