
import {blogCollection, postsCollection} from "../db/db";
import {postMap, PostsDbType, PostsOutput} from "./query-Post-Repo";



// export type SortData = {
//     searchNameTerm: string | null,
//     sortBy: string,
//     sortDirection: SortDirection,
//     pageNumber: number,
//     pageSize: number
// }

export type BlogsDbType = {
    _id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type BlogsOutput = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type Pagination<I> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: I[]
}


const blogMap = (blog: BlogsDbType): BlogsOutput => {
    return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const blogsQueryRepository = {

    async FindBlogs(sortData: any): Promise<Pagination<BlogsOutput>> {


        const {sortDirection, sortBy, pageSize, pageNumber, searchNameTerm} = sortData

        let filter = {}

        if(searchNameTerm){
            filter = {
                name: {
                   $regex: searchNameTerm,
                   $options: 'i'
                }
            }
        }

        const blogs: BlogsDbType[] = await blogCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await blogCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            pageSize,
            page: pageNumber,
            pagesCount,
            totalCount,
            items: blogs.map(blogMap)
        }

    },

    async FindBlogsById(id: string): Promise<BlogsOutput | null> {
        const blog: BlogsDbType | null =  await blogCollection.findOne({_id: id})
        if (!blog) return null
        return  blogMap(blog)


    },

    async FindPostsByBlogId(id: string, sortData: any): Promise<Pagination<PostsOutput>> {

         const {sortDirection, sortBy, pageSize, pageNumber} = sortData

        const posts: PostsDbType[] = await postsCollection
            .find({blogId: id})
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

         const totalCount = await postsCollection.countDocuments({blogId: id})
         const pagesCount = Math.ceil(totalCount / pageSize)


         return {
             pagesCount,
             page: pageNumber,
             pageSize,
             totalCount,
             items: posts.map(postMap)
         }



        // const blog: BlogsDbType | null =  await blogCollection.findOne({_id: id})
        // if (!blog) return null
        // return  blogMap(blog)


    },

}
