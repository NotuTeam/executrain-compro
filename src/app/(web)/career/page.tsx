/** @format */

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Building2, MapPin, Briefcase } from "lucide-react";

import Container from "@/components/atomic/container";
import HeroCareer from "@/components/hero/herocareer";
import Button from "@/components/atomic/button";
import SearchBar from "@/components/atomic/careersearchbar";
import CareerGalleryCarousel from "@/components/careergallerycarousel";

import { useCareers } from "@/services/career/hook";
import { isExpired, salaryDisplay, toList } from "@/lib/utils";
import { CareerProps } from "@/types/career";

const jobTypeLabel: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Intern",
  FREELANCE: "Freelance",
};

const jobTypeBadgeClass: Record<string, string> = {
  FULL_TIME: "border border-green-500 text-green-500",
  PART_TIME: "border border-blue-500 text-blue-500",
  CONTRACT: "border border-orange-500 text-orange-500",
  INTERNSHIP: "border border-pink-500 text-pink-500",
  FREELANCE: "border border-purple-500 text-purple-500",
};

const expLevelLabel: Record<string, string> = {
  JUNIOR: "Junior (0–2 years)",
  MID: "Mid-level (3–5 years)",
  SENIOR: "Senior (5+ years)",
  LEAD: "Lead / Principal",
};

export default function CareerPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [filterDept, setFilterDept] = useState("ALL");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCareers({ sort_order: "desc" });

  const careers = useMemo<CareerProps[]>(() => {
    return (
      data?.pages?.flatMap(
        (page: { data?: CareerProps[] }) => page.data || [],
      ) || []
    );
  }, [data]);

  const departmentOptions = useMemo(() => {
    const uniqueDepartments = Array.from(
      new Set(
        careers
          .map((job) => job.department?.trim())
          .filter((department): department is string => !!department),
      ),
    );

    return ["ALL", ...uniqueDepartments];
  }, [careers]);

  const filteredJobs = useMemo(() => {
    return careers.filter((job) => {
      const searchLower = search.toLowerCase();
      const matchSearch =
        (job.title || "").toLowerCase().includes(searchLower) ||
        (job.location || "").toLowerCase().includes(searchLower) ||
        (job.department || "").toLowerCase().includes(searchLower);

      const matchLevel =
        filterLevel === "ALL" || job.experience_level === filterLevel;
      const matchDept = filterDept === "ALL" || job.department === filterDept;

      return (
        matchSearch && matchLevel && matchDept && job.status === "PUBLISHED"
      );
    });
  }, [careers, search, filterLevel, filterDept]);

  const selectedJob = useMemo(
    () =>
      filteredJobs.find((job) => job._id === selectedJobId) ||
      filteredJobs?.[0] ||
      null,
    [filteredJobs, selectedJobId],
  );

  const effectiveSelectedJobId = useMemo(() => {
    if (filteredJobs.length === 0) return null;

    const selectedStillExists = filteredJobs.some(
      (job) => job._id === selectedJobId,
    );

    return selectedStillExists ? selectedJobId : filteredJobs[0]._id;
  }, [filteredJobs, selectedJobId]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Container>
      <HeroCareer />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-8 space-y-5 mt-[8%]">
        <h1 className="text-center font-semibold text-2xl! md:text-5xl!">
          What Sets Us Apart
        </h1>
        <p className="text-center font-semibold">
          Lorem ipsum dolor sit amet consectetur. Feugiat massa in non mi eu.
        </p>
        <div className="flex gap-3">
          {[1, 2, 3].map((each: number, index: number) => (
            <div
              key={index + 1}
              className="border border-primary-600 rounded-lg p-5 flex flex-1 gap-3"
            >
              <div>
                <span className="text-primary-600 font-bold border border-primary-600 rounded-full aspect-square w-8 flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <div>
                <span className="font-semibold mb-2 block">
                  Lorem ipsum dolor sit amet consectetur.
                </span>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur. Proin dolor ornare
                  dolor euismod cras quis donec nunc eu. Amet amet tristique.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%]">
        <h2 className="text-2xl! md:text-5xl! font-semibold leading-tight text-center mb-5">
          Explore career opportunities at
          <span className="text-primary-600"> ExecuTrain</span>.
        </h2>
      </div>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-[5%]">
        <SearchBar
          searchValue={search}
          onSearchChange={setSearch}
          levelValue={filterLevel}
          onLevelChange={setFilterLevel}
          deptValue={filterDept}
          onDeptChange={setFilterDept}
          departmentOptions={departmentOptions}
        />
      </div>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] ">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Loading careers...</p>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {filteredJobs.length} Vacancy
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl h-fit">
                {filteredJobs.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    Tidak ada lowongan yang sesuai
                  </p>
                ) : (
                  <div className="space-y-3">
                    {filteredJobs.map((job) => {
                      const isSelected = effectiveSelectedJobId === job._id;
                      const expired = isExpired(job.deadline);

                      return (
                        <button
                          key={job._id}
                          type="button"
                          onClick={() => setSelectedJobId(job._id)}
                          className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary-600 bg-primary-50/40 shadow"
                              : "border-gray-200 bg-white hover:border-gray-400 hover:shadow"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900 max-w-[65%] text-ellipsis">
                              {job.title || "-"}
                            </p>
                            <p
                              className={`text-xs px-2 py-1 rounded-md font-medium flex flex-nowrap ${
                                jobTypeBadgeClass[job.job_type || ""] ||
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {jobTypeLabel[job.job_type || ""] ||
                                job.job_type ||
                                "-"}
                            </p>
                          </div>

                          <div className="mt-2 text-xs text-gray-600 space-y-3">
                            <p className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" /> ExecuTrain
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />{" "}
                              {job.location || "-"}
                            </p>
                          </div>

                          <p className="mt-3 px-2 bg-gray-200 text-gray-399 text-xs py-1 w-fit rounded">
                            {salaryDisplay(job)}
                          </p>

                          {expired && (
                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary-600 text-white">
                              Expired
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {hasNextPage && (
                  <div className="mt-4 flex justify-center">
                    <Button
                      label={isFetchingNextPage ? "Loading..." : "Load More"}
                      rounded
                      type={isFetchingNextPage ? "disable" : "primary"}
                      onClick={handleLoadMore}
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-8 bg-white border rounded-xl">
                {selectedJob ? (
                  <>
                    <section className="p-5 md:p-6">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/logo-simple-red.png"
                          alt="logo"
                          width={20}
                          height={10}
                        />
                        <p className="text-gray-600 text-md tracking-wide">
                          ExecuTrain
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <p className="text-2xl flex-1 md:text-3xl font-bold text-gray-900">
                          {selectedJob.title}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            jobTypeBadgeClass[selectedJob.job_type || ""] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {jobTypeLabel[selectedJob.job_type || ""] ||
                            selectedJob.job_type ||
                            "-"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{" "}
                          {selectedJob.location || "-"}
                        </p>
                        <p className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />{" "}
                          {expLevelLabel[selectedJob.experience_level || ""] ||
                            selectedJob.experience_level ||
                            "-"}
                        </p>
                      </div>

                      <p className="mt-5 font-bold">
                        {salaryDisplay(selectedJob)}
                      </p>
                    </section>
                    <section className="border-y p-5 md:p-6 space-y-2">
                      <span className="font-semibold block">Apply Now</span>
                      <p className="text-xs">
                        Kirim CV dan Resume ke email:{" "}
                        <strong>
                          {selectedJob.contact_email
                            ? selectedJob.contact_email
                            : "talent@executrain.co.id"}
                        </strong>
                      </p>
                    </section>
                    <section className="p-5 md:p-6 space-y-2">
                      <p className="font-semibold text-gray-900 ">
                        Job Description
                      </p>
                      {toList(selectedJob.description).length > 0 && (
                        <div className="text-xs">
                          <p>Job Requirement : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.description).map(
                              (item, index) => (
                                <li key={`desc-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      {toList(selectedJob.requirements).length > 0 && (
                        <div className="text-xs">
                          <p>Job Description : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.requirements).map(
                              (item, index) => (
                                <li key={`req-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      {toList(selectedJob.applicant_question).length > 0 && (
                        <div className="text-xs">
                          <p>Application Question(s) : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.applicant_question).map(
                              (item, index) => (
                                <li key={`question-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      <p className="text-xs">
                        Job Type :{" "}
                        {jobTypeLabel[selectedJob.job_type || ""] ||
                          selectedJob.job_type ||
                          "-"}
                      </p>
                      {toList(selectedJob.experiance_requirement).length >
                        0 && (
                        <div className="text-xs">
                          <p>Experience : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.experiance_requirement).map(
                              (item, index) => (
                                <li key={`exp-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </section>
                  </>
                ) : (
                  <div className="text-sm text-gray-600">
                    Pilih lowongan untuk melihat detail
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] text-center py-[10%] md:pb-[5%] space-y-5 md:space-y-8 flex flex-col items-center">
        <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
          {"Can’t find the role you’re looking for?"}
        </h2>
        <p className="text-[14px] md:text-[16px]">
          Send your CV and resume to our email.
        </p>
        <Button
          onClick={() => {}}
          label="Send Your Application"
          rounded
          type="primary"
        />
      </div>
      <CareerGalleryCarousel />
    </Container>
  );
}
