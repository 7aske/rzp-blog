import * as React from "react";
import { Link } from "react-router-dom";
import { defaultLocale } from "../../hooks/useLocale";
import localization from "./localization";

type CategoryStatsProps = {
	stats?: CategoryStatsDTO;
	locale: string;
};
export const CategoryStats = ({locale, stats}: CategoryStatsProps) => {
	const total = stats ? Object.values(stats.stats).reduce((acc, curr) => acc += curr) : 0;

	return (
		<div>
			<h3>{localization[locale].title}</h3>
			{stats ?
				<div>
					<h5>{localization[locale].total}: {total}</h5>
					{Object.keys(stats.stats).map(s => <CategoryStatBar name={s} value={stats.stats[s]} total={total}/>)}
				</div> :
				<h4>{localization[locale].noData}</h4>}
		</div>
	);
};



type CategoryStatBarProps = {
	total: number;
	name: string;
	value: number;
}
const CategoryStatBar = ({name, total, value}: CategoryStatBarProps) => {
	return (<div key={name}>
		<Link className="theme-green-light-text" to={`/category/${name}`}>{name}</Link>: {value}
		<div key={name} className="progress">
			<div className="determinate animate__animated animate__slow animate__lightSpeedInLeft" style={{width: `${value/total * 100}%`}}/>
		</div>
	</div>);
};

CategoryStats.defaultProps = {
	locale: defaultLocale,
};

