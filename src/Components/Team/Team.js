import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Member from 'Components/UI/Member/Member';
import avatarAman from 'Assets/img/avatar-aman.png';
import avatarEliot from 'Assets/img/avatar-eliot.png';
import avatarLoqman from 'Assets/img/avatar-loqman.png';
import avatarSteven from 'Assets/img/avatar-steven.png';
import avatarXiumin from 'Assets/img/avatar-xiumin.png';

const people = [
  {
    name: 'Steven VAN',
    role: 'Développeur front-end',
    imageUrl: avatarSteven,
  },
  {
    name: 'Xiumin LIN',
    role: 'Développeur back-end',
    imageUrl: avatarXiumin,
  },
  {
    name: 'Aman Kumar',
    role: 'Chef de projet / Développeur',
    imageUrl: avatarAman,
  },
  {
    name: 'Loqman KHALFAOUI',
    role: 'Développeur',
    imageUrl: avatarLoqman,
  },
  {
    name: 'Eliot GLARNER',
    role: 'Développeur',
    imageUrl: avatarEliot,
  },
];

export default function Team() {
  const teamTween = useRef();
  const memberIcon = React.createRef();
  const teamText = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    teamTween.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#team',
        start: 'top bottom',
        end: 'top top',
        toggleActions: 'play none none reset',
      },
    });

    teamTween.current
      .from(teamText.current, {
        x: '-100%',
        opacity: 0,
        ease: 'back.out(1.7)',
      })
      .from(
        memberIcon.current,
        {
          x: '100%',
          opacity: 0,
          ease: 'back.out(1.7)',
        },
        '>'
      );
  });

  return (
    <section id="team" className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-5 sm:space-y-4" ref={teamText}>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-500">
              DUT APP - Projet PJS4 - 2020/2021
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul
              ref={memberIcon}
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
            >
              {people.map(person => (
                <Member
                  name={person.name}
                  imageUrl={person.imageUrl}
                  role={person.role}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
