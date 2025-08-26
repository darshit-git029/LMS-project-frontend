import CourseDetailsPage from "../../components/Courses/CourseDetailsPage";
type Props = {
    params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    return <CourseDetailsPage id={resolvedParams.id} />;
}
