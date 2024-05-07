const StatisticsCard = ({ stat }) => {
    return (
        <div className="max-w-lg w-full rounded-lg shadow-lg p-4 my-4">
            <h3 className="font-semibold text-lg tracking-wide">{stat.screen_detail.name}</h3>
            <p className="text-gray-500 my-1">
                Число показов: {stat.show_count}
            </p>
            <p className="text-gray-500 my-1">
                Общее время просмотра: {stat.total_viewing_time}
            </p>
            <p className="text-gray-500 my-1">
                Максимальное количество зрителей: {stat.max_viewers_count}
            </p>
        </div>
    );
};


export default StatisticsCard;